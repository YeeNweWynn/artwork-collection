export interface IArtwork {
    style_titles: string[];
    id: number;
    image_id: string;
    title: string;
    artist_title: string;
    place_of_origin: string;
    medium_display: string;
    date_start: number;
    date_end: number;
}

export interface IDropdownOption {
    key: string;
    value: string;
}

export interface IFilterArtworkOption {
    title: string;
    count: number;
    
}