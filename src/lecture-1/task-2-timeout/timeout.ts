import { Observable } from 'rxjs';

export function timeout(timeoutMs: number): Observable<void> {
  return new Observable((observer) => {
    const handler = function(): void {
      observer.next();
      //to complete immediately
      observer.complete();
    };

    const customTimer = window.setTimeout(handler, timeoutMs);

    return (): void => {
      window.clearTimeout(customTimer);
    };
  });
}
