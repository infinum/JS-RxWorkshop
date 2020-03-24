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
  return new Observable<IReqResponse>((observer) => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      observer.next({
        response: xhr.response,
        status: xhr.status,
      });
      observer.complete();
    });

    xhr.addEventListener('error', () => {
      observer.error({
        response: null,
        status: xhr.status,
      });
    });

    xhr.open(method, url);

    if (options && options.headers) {
      Object.keys(options.headers).forEach((key) => {
        xhr.setRequestHeader(key, options.headers[key]);
      });
    }

    xhr.responseType = 'json';

    if (method == 'POST' && options && options.body) {
      let json = JSON.stringify(options.body);
      xhr.send(json);
    } else {
      xhr.send();
    }

    return () => {
      xhr.abort();
    };
  });
}
