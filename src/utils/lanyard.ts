import { EventEmitter } from "events";

import { LanyardPresence } from "../types/lanyard";
import { DISCORD_ID } from "../consts";

enum Op {
  Event,
  Hello,
  Initialize,
  Heartbeat,
}

enum Event {
  INIT_STATE = "INIT_STATE",
  PRESENCE_UPDATE = "PRESENCE_UPDATE",
}

interface SocketData extends Partial<LanyardPresence> {
  heartbeat_interval?: number;
}

interface SocketMessage {
  op: Op;
  t?: Event;
  d?: SocketData;
}

export interface Lanyard {
  ws: WebSocket;
  heartbeat: NodeJS.Timeout;
  user_id: string;
  last_presence: LanyardPresence;

  on(event: "presence", listener: (presence: LanyardPresence) => void): this;
}

export class Lanyard extends EventEmitter {
  constructor(id: string) {
    super();

    this.user_id = id;
    this.ws = new WebSocket("wss://api.lanyard.rest/socket");

    // Socket open handler
    this.ws.addEventListener("open", () => this.emit("connected"));

    // Message listener
    this.ws.addEventListener("message", (e) => {
      try {
        this.message(JSON.parse(e.data));
      } catch (error) {}
    });

    // Close event for websocket
    this.ws.addEventListener("close", () => clearInterval(this.heartbeat));
  }

  private send(op: Op, d?: any): void {
    if (this.ws.readyState != this.ws.OPEN) return;
    return this.ws.send(JSON.stringify({ op, d }));
  }

  private subscribe(subscribe_to_id: string): void {
    return this.send(Op.Initialize, { subscribe_to_id });
  }

  private sendHeartbeat(): void {
    return this.send(Op.Heartbeat);
  }

  private message(data: SocketMessage): void {
    switch (data.op) {
      case Op.Hello:
        // Got hello, start our heartbeat interval
        this.heartbeat = setInterval(
          () => this.sendHeartbeat(),
          data.d?.heartbeat_interval,
        );

        // Subscribe to our user id
        this.subscribe(this.user_id);
        break;

      case Op.Event:
        switch (data.t) {
          case Event.INIT_STATE:
          case Event.PRESENCE_UPDATE:
            this.last_presence = data.d as LanyardPresence;
            this.emit("presence", data.d);

            break;

          default:
            break;
        }

        break;
      default:
        break;
    }
  }

  requestPresenceUpdate(): void {
    if (this.last_presence) this.emit("presence", this.last_presence);
  }
}

export const lanyard = typeof window != "undefined" && new Lanyard(DISCORD_ID);
