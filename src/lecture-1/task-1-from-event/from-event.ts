import { Observable } from 'rxjs';

export function fromEvent(element: HTMLElement, eventType: string): Observable<Event> {
  return new Observable<Event>((observer) => {
    const eventHandler = (event) => observer.next(event);
    element.addEventListener(eventType, eventHandler);

    return () => {
      element.removeEventListener(eventType, eventHandler);
    };
  });
}
