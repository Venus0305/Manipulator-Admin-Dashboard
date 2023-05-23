export interface IListItem {
  id: string;
  name: string;
}

export interface IListResult<T> {
  docs: T[];
  totalDocs: number;
  page: number;
  limit: number;
  totalPages: number;
}
