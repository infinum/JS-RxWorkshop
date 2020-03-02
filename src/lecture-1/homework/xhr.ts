import { Observable } from 'rxjs';

export interface IXHROptions {
  body?: any;
  headers?: Record<string, string>
}

export interface IXHRResponse {
  response: string;
  responseText: string;
  status: number;
  statusText: string;
}

export function xhr(method: string, url: string, options?: IXHROptions): Observable<IXHRResponse> {
  return new Observable((subscriber) => {
    const request = new XMLHttpRequest();

    request.onload = function() {
      subscriber.next({
        response: request.response,
        responseText: request.responseText,
        status: request.status,
        statusText: request.statusText,
      });
    };

    request.onloadend = function() {
      subscriber.complete();
    };

    request.onerror = function() {
      subscriber.error({
        status: request.status,
        statusText: request.statusText,
      });
    };

    request.open(method, url);

    if (options?.headers) {
      Object.keys(options.headers).forEach((header) => {
        request.setRequestHeader(header, options.headers[header]);
      });
    }

    request.send(JSON.stringify(options?.body));

    return () => {
      request.abort();
    };
  });
}
