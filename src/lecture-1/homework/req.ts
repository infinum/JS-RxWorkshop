import { Observable } from 'rxjs';

export interface IReqOptions<TBody> {
  body?: TBody;
  headers?: Record<string, string>;
}

export interface IReqResponse {
  response: string;
  status: number;
}

export function req<TBody = void>(method: string, url: string, options?: IReqOptions<TBody>): Observable<IReqResponse> {
  return null;
}
