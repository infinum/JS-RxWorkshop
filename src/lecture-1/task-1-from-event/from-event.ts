import { Observable } from 'rxjs';

// emits the event object when the event triggers => cold!
// What should happen when you unsubscribe? => nth
// complete ? da! => on remove ?
export function fromEvent(element: HTMLElement, eventType: string): Observable<Event> {
  return new Observable((observer) => {
    const handler = function(): void {
      const event = new Event(eventType);
      observer.next(event);
    };

    element.addEventListener(eventType, handler);

    return (): void => {
      element.removeEventListener(eventType, handler);
      observer.complete();
    };
  });
}
