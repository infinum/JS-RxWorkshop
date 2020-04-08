import { of, concat, EMPTY } from 'rxjs';
import { delay } from 'rxjs/operators';
import { mockApi } from '../../helpers/mock-api.helper';
import { ISearchResult } from '../interfaces/search-result.interface';
import { ajax } from 'rxjs/ajax';
import { searchPeople } from './search';

describe('#lecture-2 #task-2-2 search', () => {
  const resultLuke: ISearchResult = {
    count: 1,
    results: [
      {
        name: 'Luke',
        birth_year: '19BBY', // eslint-disable-line @typescript-eslint/camelcase
      },
    ],
  };

  const resultVader: ISearchResult = {
    count: 1,
    results: [
      {
        name: 'Darth Vader',
        birth_year: '41BBY', // eslint-disable-line @typescript-eslint/camelcase
      },
    ],
  };

  const resultLukeSkywalker: ISearchResult = {
    count: 1,
    results: [
      {
        name: 'Luke Skywalker',
        birth_year: '19BBY', // eslint-disable-line @typescript-eslint/camelcase
      },
    ],
  };

  beforeEach(() => {
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it('should fetch the results', (done: DoneFn) => {
    const input$ = of('l');

    mockApi('https://swapi.co/api/people/?search=l', resultLuke);

    searchPeople(input$).subscribe((names) => {
      expect(names).toEqual(resultLuke.results.map((p) => p.name));
      done();
    });
  });

  it('should not overfetch the results', (done: DoneFn) => {
    const delayMs = 200;
    // prettier-ignore
    const input$ = concat(
      of('L'),
      of('Lu').pipe(delay(delayMs)),
      of('Luk').pipe(delay(delayMs)),
      of('Luke').pipe(delay(delayMs)),
    );

    mockApi('https://swapi.co/api/people/?search=Luke', resultLuke);
    spyOn(ajax, 'getJSON').and.callThrough();

    searchPeople(input$).subscribe((results) => {
      expect(results).toEqual(['Luke']);
      expect(ajax.getJSON).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should handle quick deletion and insertion', (done: DoneFn) => {
    // prettier-ignore
    const input$ = concat(
      of('Luke'),
      of('Luk').pipe(delay(300)),
      of('Luke').pipe(delay(200)),
      of('Luke Skywalker').pipe(delay(300)),
    );

    mockApi('https://swapi.co/api/people/?search=Luke', resultLuke);
    mockApi('https://swapi.co/api/people/?search=Luke Skywalker', resultLukeSkywalker);
    spyOn(ajax, 'getJSON').and.callThrough();

    let counter = 0;
    const expected = [['Luke'], ['Luke Skywalker']];
    searchPeople(input$).subscribe((names) => {
      expect(names).toEqual(expected[counter]);
      counter++;
      if (counter === expected.length) {
        expect(ajax.getJSON).toHaveBeenCalledTimes(expected.length);
        done();
      }
    });
  });

  it('should unsubscribe from currently active api call if a new request comes in', (done: DoneFn) => {
    // prettier-ignore
    const input$ = concat(
      of('Luke'),
      of('Vader').pipe(delay(300)),
    );

    spyOn(ajax, 'getJSON').and.callFake((url) => {
      switch (url) {
        case 'https://swapi.co/api/people/?search=Luke': // simulate response delay
          return of(resultLuke).pipe(delay(350)) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
        case 'https://swapi.co/api/people/?search=Vader':
          return of(resultVader) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
        default:
          return EMPTY;
      }
    });

    searchPeople(input$).subscribe((names) => {
      console.log(names);
      expect(names).toEqual(['Darth Vader']);
    });

    setTimeout(() => {
      expect(ajax.getJSON).toHaveBeenCalledTimes(2);
      done();
    }, 610);
  });
});
