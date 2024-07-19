export interface Response {
  code: number;
  status: string;
  etag: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: {}[];
  };
}
