import { Observable } from 'rxjs';

export function timeout(timeoutMs: number): Observable<void> {
  return new Observable((subscriber) => {
    const timeoutHandle = window.setTimeout(() => {
      subscriber.next();
      subscriber.complete();
    }, timeoutMs);

    return () => { window.clearTimeout(timeoutHandle) }
  });
}
