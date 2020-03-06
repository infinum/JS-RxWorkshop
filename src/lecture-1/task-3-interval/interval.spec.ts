import { PartialObserver } from 'rxjs';
import { interval } from './interval';

describe('#lecture-1 #task-1-3 interval', () => {
  beforeAll(() => {
    jasmine.clock().install();
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  beforeEach(() => {
    spyOn(window, 'setInterval').and.callThrough();
    spyOn(window, 'clearInterval').and.callThrough();
  });

  it('should emit every X miliseconds', () => {
    const callbacks: PartialObserver<number> = jasmine.createSpyObj('callbacks', ['next', 'error', 'complete']);

    const duration = 100;
    const timeout$ = interval(duration);

    expect(window.setInterval).toHaveBeenCalledTimes(0);

    const timeoutSubscription = timeout$.subscribe(callbacks);

    expect(window.setInterval).toHaveBeenCalledTimes(1);
    expect(callbacks.next).toHaveBeenCalledTimes(0);
    expect(callbacks.complete).toHaveBeenCalledTimes(0);

    jasmine.clock().tick(duration);

    expect(window.setInterval).toHaveBeenCalledTimes(1);
    expect(callbacks.next).toHaveBeenCalledTimes(1);
    expect(callbacks.complete).toHaveBeenCalledTimes(0);

    jasmine.clock().tick(duration);

    expect(window.setInterval).toHaveBeenCalledTimes(1);
    expect(callbacks.next).toHaveBeenCalledTimes(2);
    expect(callbacks.complete).toHaveBeenCalledTimes(0);

    timeoutSubscription.unsubscribe();
  });

  it('should clear the interval on unsubscribe', () => {
    const callbacks: PartialObserver<number> = jasmine.createSpyObj('callbacks', ['next', 'error', 'complete']);

    const duration = 100;
    const timeout$ = interval(duration);

    expect(window.setInterval).toHaveBeenCalledTimes(0);

    const timeoutSubscription = timeout$.subscribe(callbacks);

    expect(window.setInterval).toHaveBeenCalledTimes(1);
    expect(callbacks.next).toHaveBeenCalledTimes(0);
    expect(callbacks.complete).toHaveBeenCalledTimes(0);

    jasmine.clock().tick(duration);

    expect(window.setInterval).toHaveBeenCalledTimes(1);
    expect(callbacks.next).toHaveBeenCalledTimes(1);
    expect(callbacks.complete).toHaveBeenCalledTimes(0);

    timeoutSubscription.unsubscribe();

    jasmine.clock().tick(duration);

    expect(window.setInterval).toHaveBeenCalledTimes(1);
    expect(callbacks.next).toHaveBeenCalledTimes(1);
    expect(callbacks.complete).toHaveBeenCalledTimes(0);
  });
});
