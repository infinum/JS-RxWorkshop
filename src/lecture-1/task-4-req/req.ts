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
  const observable: Observable<IReqResponse> = new Observable((observer) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.onload = (): void => {
      if (xhr.status === 200) {
        observer.next(xhr);
        observer.complete();
      } else {
        observer.error();
      }
    };

    xhr.onerror = (): void => {
      observer.error(xhr);
    };

    if (options && options.headers) {
      for (const header in options.headers) {
        xhr.setRequestHeader(header, options.headers.header);
      }
    }

    xhr.send(options && options.body ? JSON.stringify(options.body) : null);

    return {
      unsubscribe(): void {
        xhr.abort();
      },
    };
  });

  return observable;
}
