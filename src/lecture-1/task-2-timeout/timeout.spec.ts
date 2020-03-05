import { PartialObserver } from 'rxjs';
import { timeout } from './timeout';

describe('Lecture 1 - Task 2 - timeout', () => {
  beforeAll(() => {
    jasmine.clock().install();
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  it('should emit and complete after specified timeout', () => {
    spyOn(window, 'setTimeout').and.callThrough();
    spyOn(window, 'clearTimeout').and.callThrough();

    const callbacks: PartialObserver<void> = jasmine.createSpyObj('callbacks', ['next', 'error', 'complete']);

    const duration = 100;
    const timeout$ = timeout(duration);

    expect(window.setTimeout).toHaveBeenCalledTimes(0);

    const timeoutSubscription = timeout$.subscribe(callbacks);

    expect(window.setTimeout).toHaveBeenCalledTimes(1);
    expect(callbacks.next).toHaveBeenCalledTimes(0);
    expect(callbacks.complete).toHaveBeenCalledTimes(0);
    expect(window.clearTimeout).toHaveBeenCalledTimes(0);

    jasmine.clock().tick(duration);

    expect(window.setTimeout).toHaveBeenCalledTimes(1);
    expect(callbacks.next).toHaveBeenCalledTimes(1);
    expect(callbacks.complete).toHaveBeenCalledTimes(1);
    expect(window.clearTimeout).toHaveBeenCalledTimes(1);
    timeoutSubscription.unsubscribe();
  });

  it('should not emit if we unsubscribe before specified timeout runs out', () => {
    spyOn(window, 'setTimeout').and.callThrough();
    spyOn(window, 'clearTimeout').and.callThrough();

    const callbacks: PartialObserver<void> = jasmine.createSpyObj('callbacks', ['next', 'error', 'complete']);

    const duration = 100;
    const timeout$ = timeout(duration);

    expect(window.setTimeout).toHaveBeenCalledTimes(0);

    const timeoutSubscription = timeout$.subscribe(callbacks);

    expect(window.setTimeout).toHaveBeenCalledTimes(1);
    expect(callbacks.next).toHaveBeenCalledTimes(0);
    expect(callbacks.complete).toHaveBeenCalledTimes(0);
    expect(window.clearTimeout).toHaveBeenCalledTimes(0);

    jasmine.clock().tick(duration / 2);

    expect(window.setTimeout).toHaveBeenCalledTimes(1);
    expect(callbacks.next).toHaveBeenCalledTimes(0);
    expect(callbacks.complete).toHaveBeenCalledTimes(0);
    expect(window.clearTimeout).toHaveBeenCalledTimes(0);

    timeoutSubscription.unsubscribe();

    jasmine.clock().tick(duration / 2);

    expect(window.setTimeout).toHaveBeenCalledTimes(1);
    expect(callbacks.next).toHaveBeenCalledTimes(0);
    expect(callbacks.complete).toHaveBeenCalledTimes(0);
    expect(window.clearTimeout).toHaveBeenCalledTimes(1);
  });
});
