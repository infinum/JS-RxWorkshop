import { Observable } from 'rxjs';
import { XHROptions, XHRResponse } from './xhr';

export function xhr(method: string, url: string, options?: XHROptions): Observable<XHRResponse> {
  return new Observable((subscriber) => {
    const request = new XMLHttpRequest();

    request.onload = function(): void {
      subscriber.next({
        response: request.response,
        responseText: request.responseText,
        status: request.status,
        statusText: request.statusText,
      });
    };

    request.onloadend = function(): void {
      subscriber.complete();
    };

    request.onerror = function(): void {
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

    return (): void => {
      request.abort();
    };
  });
}
