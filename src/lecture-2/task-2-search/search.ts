import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ISearchResult } from './../interfaces/search-result.interface';

export function searchPeople(query$: Observable<string>): Observable<Array<string>> {
  return query$.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    switchMap((query: string) => {
      return ajax.getJSON<ISearchResult>(`https://swapi.co/api/people/?search=${query}`);
    }),
    map((response) => response.results.map((person) => person.name)),
  );
}
