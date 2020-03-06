import { fromEvent } from './from-event';

describe('#lecture-1 #task-1-1 fromEvent', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  it('should be possible to subscribe to element events', () => {
    const eventHandlerSpy = jasmine.createSpy('eventHandler');
    fromEvent(element, 'click').subscribe(eventHandlerSpy);

    element.dispatchEvent(new Event('click'));

    expect(eventHandlerSpy).toHaveBeenCalled();
    expect(eventHandlerSpy.calls.mostRecent().args[0] instanceof Event).toBe(true);
  });

  it('should remove event listener on unsubscribe', (done: DoneFn) => {
    let eventHandler: Function;

    spyOn(element, 'addEventListener').and.callFake((_: string, callback: EventListener) => {
      eventHandler = callback;
    });

    spyOn(element, 'removeEventListener').and.callFake((_: string, callback: EventListener) => {
      expect(callback).toBe(eventHandler);
      done();
    });

    const subscription = fromEvent(element, 'mousedown').subscribe();
    subscription.unsubscribe();
  });
});
