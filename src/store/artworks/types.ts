export interface PictureItem {
  id: string;
  image_id: string;
  artist_title: string;
  artwork_type_title: string;
  date_display: string;
  title: string;
  provenance_text: string;
}

export interface PaginationItem {
  current_page: number;
  limit: number;
  offset: number;
  total: number;
  total_pages: number;
}
