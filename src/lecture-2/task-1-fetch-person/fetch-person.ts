import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { IPerson } from '../interfaces/person.interface';
import { Person } from '../models/person.model';

export function fetchPerson(id: number): Observable<Person> {
  const baseUrl: string = 'https://swapi.co/api/people/';
  return ajax.getJSON(`${baseUrl}${id}/`).pipe(
    map((response: IPerson) => {
      return new Person(response.name, response.birth_year);
    }),
  );
}
