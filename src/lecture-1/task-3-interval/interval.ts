import { Observable } from 'rxjs';

export function interval(intervalMs: number): Observable<number> {
  return new Observable((observer) => {
    const interval = setInterval(() => {
      observer.next();
    }, intervalMs);

    return (): void => clearInterval(interval);
  });
}
