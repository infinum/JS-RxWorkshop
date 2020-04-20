import { Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { IPerson } from '../interfaces/person.interface';
import { ISearchResult } from '../interfaces/search-result.interface';

export function searchPeople(query$: Observable<string>): Observable<Array<string>> {
  const baseUrl = 'https://swapi.co/api/people/?search=';
  return query$.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    switchMap((query: string) => ajax.getJSON(`${baseUrl}${query}`)),
    map((result: ISearchResult) => result.results.map((person: IPerson) => person.name)),
  );
}
