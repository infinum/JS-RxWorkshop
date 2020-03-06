import 'jasmine-ajax';
import { req } from './req';

describe('#lecture-1 #task-1-4 req', () => {
  beforeEach(() => {
    jasmine.Ajax.install();

    jasmine.Ajax.stubRequest('/infinum/index').andReturn({
      status: 200,
      responseText: '{ "response": "incredible cool things" }',
    });

    jasmine.Ajax.stubRequest('/infinum/error').andError({
      status: 0,
    });

    jasmine.Ajax.stubRequest('/infinum/timeout').andTimeout();
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  it('should make a GET request', (done: DoneFn) => {
    req('GET', '/infinum/index').subscribe((response) => {
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(JSON.parse(response.response).response).toBe('incredible cool things');
      done();
    });

    const request = jasmine.Ajax.requests.mostRecent();
    expect(request.method).toBe('GET');
  });

  it('should make a POST request with a body', (done: DoneFn) => {
    req('POST', '/infinum/index', { body: { name: 'John' } }).subscribe((response) => {
      expect(response).toBeDefined();
      done();
    });

    const request = jasmine.Ajax.requests.mostRecent();
    expect(request.method).toBe('POST');
    expect(Object.keys(request.data())[0]).toEqual(JSON.stringify({ name: 'John' }));
  });

  it('should set request headers', (done: DoneFn) => {
    req('GET', '/infinum/index', { headers: { header: 'value' } }).subscribe((response) => {
      expect(response).toBeDefined();
      done();
    });

    const request = jasmine.Ajax.requests.mostRecent();
    expect(request.requestHeaders).toEqual({ header: 'value' });
  });

  it('should handle errors', (done: DoneFn) => {
    req('GET', '/infinum/error').subscribe(null, (error) => {
      expect(error.status).toBe(500);
      done();
    });
  });

  it('should handle timeouts', () => {
    const onErrorSpy = jasmine.createSpy('onError');
    req('GET', '/infinum/timeout').subscribe({ error: onErrorSpy });
    expect(onErrorSpy).toHaveBeenCalled();
  });

  it('should complete after response is received', () => {
    const onCompleteSpy = jasmine.createSpy('onComplete');
    req('GET', '/infinum/index').subscribe({ complete: onCompleteSpy });
    expect(onCompleteSpy).toHaveBeenCalled();
  });

  it('should be cancellable', (done: DoneFn) => {
    const onSuccessSpy = jasmine.createSpy('onSuccess');
    const subscription = req('GET', '/infinum/long-request').subscribe(onSuccessSpy);
    subscription.unsubscribe();

    const request = jasmine.Ajax.requests.mostRecent();
    setTimeout(() => {
      request.respondWith({
        status: 200,
      });
      expect(onSuccessSpy).not.toHaveBeenCalled();
      done();
    }, 0);
  });
});
