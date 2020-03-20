import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';

export interface IPerson {
  name: string;
}

export function searchPeople(query$: Observable<string>): Observable<Array<string>> {
  return query$.pipe(
    debounceTime(100),
    distinctUntilChanged(),
    switchMap((query: string) => {
      return ajax.getJSON<Array<IPerson>>(`/?search=${query}`);
    }),
    map((results) => results.map((person) => person.name)),
  );
}
