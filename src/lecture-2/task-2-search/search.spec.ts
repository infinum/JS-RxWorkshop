import { searchPeople } from './search';
import { of, interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';

function mockApi(query: string, response: object): void {
  jasmine.Ajax.stubRequest(`/?search=${query}`).andReturn({
    status: 200,
    responseText: JSON.stringify(response),
  });
}

describe('#lecture-2 #task-2-2 search', () => {
  beforeEach(() => {
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it('should fetch the results', (done: DoneFn) => {
    const input$ = of('a');

    mockApi('a', [{ name: 'Test' }]);

    searchPeople(input$).subscribe((names) => {
      expect(names).toEqual(['Test']);
      done();
    });
  });

  it('should not overfetch the results', (done: DoneFn) => {
    const inputs = {
      0: 'a',
      45: 'ab',
      100: 'abc',
      220: 'abcd',
    };
    const input$ = interval(5).pipe(
      filter((value) => value in inputs),
      map((value) => inputs[value]),
    );

    mockApi('a', [{ name: 'Test' }]);
    mockApi('abc', [{ name: 'Test 2' }]);
    mockApi('abcd', [{ name: 'Test 3' }]);

    let counter = 0;
    const expected = [['Test'], ['Test 2'], ['Test 3']];
    searchPeople(input$).subscribe((names) => {
      expect(names).toEqual(expected[counter]);
      counter++;
      if (counter === expected.length) {
        done();
      }
    });
  });

  it('should cache existing results', (done: DoneFn) => {
    const inputs = {
      0: 'a',
      45: 'ab',
      100: 'a',
      210: 'ab',
      220: 'abc',
    };
    const input$ = interval(5).pipe(
      filter((value) => value in inputs),
      map((value) => inputs[value]),
    );

    mockApi('a', [{ name: 'Test' }]);
    mockApi('abc', [{ name: 'Test 2' }]);

    let counter = 0;
    const expected = [['Test'], ['Test'], ['Test 2']];
    searchPeople(input$).subscribe((names) => {
      expect(names).toEqual(expected[counter]);
      counter++;
      if (counter === expected.length) {
        done();
      }
    });
  });
});
