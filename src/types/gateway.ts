export interface InternalPlayerResponse {
    is_playing: boolean;
    device_name?: string;
    device_type?: string;
    item_name?: string;
    item_author?: string;
    item_type?: string;
    item_id?: string;
    item_image?: string;
    item_progress?: number;
    item_length_ms?: number;
    started_at?: number;
}