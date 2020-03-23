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
  return new Observable((observer) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.onload = function onload(): void {
      if (xhr.status > +400) {
        observer.error();
      } else {
        observer.next(xhr);
        observer.complete();
      }
    };

    xhr.onerror = function onerror(): void {
      observer.error(xhr);
    };

    if (options?.headers) {
      for (const header in options.headers) {
        xhr.setRequestHeader(header, options?.headers?.header);
      }
    }

    xhr.send(JSON.stringify(options?.body) || null);

    return (): void => {
      xhr.abort();
    };
  });
}
