import { Observable } from 'rxjs';

export function timeout(timeoutMs: number): Observable<void> {
  return new Observable<void>((observer) => {
    const timeout = setTimeout(() => {
      observer.next();
      observer.complete();
    }, timeoutMs);

    return () => {
      clearTimeout(timeout);
    };
  });
}
