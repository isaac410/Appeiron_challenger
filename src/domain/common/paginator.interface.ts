export interface IPaginator<T> {
  pages: number;
  total: number;
  documents: T[];
  totalCount: number;
}
