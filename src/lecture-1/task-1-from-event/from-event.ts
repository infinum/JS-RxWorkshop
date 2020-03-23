import { Observable } from 'rxjs';

export function fromEvent(element: HTMLElement, eventType: string): Observable<Event> {
  return new Observable((observer) => {
    const listener = (event: Event): void => {
      observer.next(event);
    };
    element.addEventListener(eventType, listener);
    return {
      unsubscribe(): void {
        element.removeEventListener(eventType, listener);
      },
    };
  });
}
