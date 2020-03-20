import { Observable } from 'rxjs';

export function interval(intervalMs: number): Observable<number> {
  return new Observable((observer) => {
    let counter = 0;

    const handler = function(): void {
      //should not be completed
      observer.next(counter++);
    };

    const customInterval = window.setInterval(handler, intervalMs);

    return (): void => {
      window.clearInterval(customInterval);
    };
  });
}
