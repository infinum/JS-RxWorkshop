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

    xhr.open(method, url, true);

    if (options?.headers) {
      for (const key in options.headers) {
        xhr.setRequestHeader(key, options.headers[key]);
      }
    }

    xhr.onprogress = function() {
      observer.next({
        response: xhr.response,
        status: xhr.status,
      });
    };

    xhr.onerror = function() {
      observer.error({
        response: xhr.response,
        status: xhr.status,
      });
    };

    xhr.onload = function() {
      observer.complete();
    };

    xhr.onabort = function() {
      console.log('ABORT');
    };

    xhr.send(JSON.stringify(options?.body));

    return (): void => {
      xhr.abort();
    };
  });
}
