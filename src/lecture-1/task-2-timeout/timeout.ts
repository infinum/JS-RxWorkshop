import { Observable } from 'rxjs';

export function timeout(timeoutMs: number): Observable<void> {
  return new Observable<void>((observer) => {
    const timeoutId = setTimeout(() => {
      observer.next();
      observer.complete();
    }, timeoutMs);

    return {
      unsubscribe(): void {
        clearTimeout(timeoutId);
      },
    };
  });
}
