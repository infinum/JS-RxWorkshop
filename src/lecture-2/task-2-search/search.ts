import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IPerson {
  name: string;
}

export function searchPeople(query$: Observable<string>): Observable<Array<string>> {
  return query$.pipe(
    /* do stuff */
    map(() => ['Lorem ipsum']),
  );
}
