import { Observable } from 'rxjs';

export function fromEvent(element: HTMLElement, eventType: string): Observable<Event> {
  return new Observable((subscriber) => {
    const eventHandler = function(event: Event): void {
      subscriber.next(event);
    };

    element.addEventListener(eventType, eventHandler);

    return (): void => {
      element.removeEventListener(eventType, eventHandler);
    };
  });
}
