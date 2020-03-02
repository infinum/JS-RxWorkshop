import { Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface XHROptions<TBody = any> {
  body?: TBody;
  headers?: Record<string, string>;
}

export interface XHRResponse {
  response: string;
  responseText: string;
  status: number;
  statusText: string;
}

export function xhr(method: string, url: string, options?: XHROptions): Observable<XHRResponse> {
  // TODO: implement!
}
