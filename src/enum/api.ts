export type APIResponse<T> = {
  data: T;
  error: string | null;
  message: string;
  status: string;
};

export type PaginatedResponse<T> = {
  results: T[];
  total: number;
  page: number;
  limit: number;
};
