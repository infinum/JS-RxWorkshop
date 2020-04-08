import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { IPerson } from '../../../src/lecture-2/interfaces/person.interface';
import { Person } from '../../../src/lecture-2/models/person.model';

export function fetchPerson(id: number): Observable<Person> {
  return ajax.getJSON<IPerson>(`https://swapi.co/api/people/${id}/`).pipe(
    map((person) => {
      return new Person(person.name, person.birth_year);
    }),
  );
}
