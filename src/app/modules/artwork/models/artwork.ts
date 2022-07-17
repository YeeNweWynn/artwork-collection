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

export enum ArtWorkFilter {
    recommendation = '',
    title = 'title',
    artist_title = 'artist_title',
    date = 'date_start',
}

export enum Pagination {
    count = 0,
    page = 1,
    perPage = 8,
}

export type TSortKey =
  | ArtWorkFilter.recommendation
  | ArtWorkFilter.title
  | ArtWorkFilter.artist_title
  | ArtWorkFilter.date;