export interface Artwork {
    id: number;
    image_id: string;
    title: string;
    artist_title: string;
    place_of_origin: string;
    date_start: number;
    date_end: number;
}

export interface DropdownOption {
    key: string;
    value: string;
}