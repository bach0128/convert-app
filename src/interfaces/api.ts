export type APIResponse<T> = {
  data: T;
  error: string | null;
  message: string;
  status: string;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
};
