import { Observable } from 'rxjs';

export function interval(intervalMs: number): Observable<number> {
  return new Observable((subscriber) => {
    let counter = 0;
    const intervalHandle = window.setInterval(() => {
      subscriber.next(counter++);
    }, intervalMs);

    return () => {
      window.clearInterval(intervalHandle);
    }
  })
}
