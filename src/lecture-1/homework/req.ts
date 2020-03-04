import { Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IReqOptions<TBody = any> {
  body?: TBody;
  headers?: Record<string, string>;
}

export interface IReqResponse {
  response: string;
  responseText: string;
  status: number;
  statusText: string;
}

export function req(method: string, url: string, options?: IReqOptions): Observable<IReqResponse> {
  return null;
}
