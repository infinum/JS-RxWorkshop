import { Observable } from 'rxjs';

export function timeout(timeoutMs: number): Observable<void> {
  return new Observable((observer) => {
    const timer = setTimeout(() => {
      observer.next();
      observer.complete();
    }, timeoutMs);

    return (): void => clearTimeout(timer);
  });
}
