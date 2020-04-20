import { Observable } from 'rxjs';
import { Person } from '../models/person.model';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { IPerson } from '../interfaces/person.interface';

export function fetchPerson(id: number): Observable<Person> {
  const url = `https://swapi.co/api/people/${id}/`;
  return ajax.getJSON(url).pipe(
    map((res: IPerson) => {
      return new Person(res.name, res.birth_year);
    }),
  );
}
