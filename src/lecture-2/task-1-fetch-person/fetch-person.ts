import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { Person } from '../models/person.model';
import { IPerson } from './../interfaces/person.interface';

export function fetchPerson(id: number): Observable<Person> {
  return ajax.getJSON<IPerson>(`https://swapi.co/api/people/${id}/`).pipe(
    map((person: IPerson) => {
      return new Person(person.name, person.birth_year);
    }),
  );
}
