import { Observable } from 'rxjs';

export function fromEvent(element: HTMLElement, eventType: string): Observable<Event> {
  return new Observable((observer) => {
    const handler = (event: Event): void => observer.next(event);

    element.addEventListener(eventType, handler);

    return (): void => element.removeEventListener(name, handler);
  });
}
