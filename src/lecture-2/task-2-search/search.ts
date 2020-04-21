import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ISearchResult } from '../interfaces/search-result.interface';
import { Person } from '../models/person.model';
import { IPerson } from '../interfaces/person.interface';

export function searchPeople(query$: Observable<string>): Observable<Array<string>> {
  const baseUrl: string = 'https://swapi.co/api/people/?search=';

  return query$.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    switchMap((query: string): Observable<ISearchResult> => ajax.getJSON<ISearchResult>(`${baseUrl}${query}`)),
    map((result: ISearchResult): Array<string> => result.results.map(({ name }: IPerson) => name)),
  );
}
