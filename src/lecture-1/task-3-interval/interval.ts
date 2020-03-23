import { Observable } from 'rxjs';

export function interval(intervalMs: number): Observable<number> {
  return new Observable((observer) => {
    let number = 0;
    const intervalId = setInterval(() => {
      observer.next(number++);
    }, intervalMs);

    return {
      unsubscribe(): void {
        clearInterval(intervalId);
      },
    };
  });
}
