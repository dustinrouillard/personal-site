import { URL_BASE } from "./core";

export async function checkToken(token: string) {
  const req = await fetch(`${URL_BASE}/v2/management/check`, {
    headers: { Authorization: token },
    next: { revalidate: 60 },
  });
  if (req.status != 204) throw { code: "invalid_token" };

  return;
}
