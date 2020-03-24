import { Observable } from 'rxjs';

export function interval(intervalMs: number): Observable<number> {
  let i = 0;

  return new Observable<number>((observer) => {
    const interval = setInterval(() => {
      observer.next(i++);
    }, intervalMs);

    return () => {
      clearInterval(interval);
    };
  });
}
