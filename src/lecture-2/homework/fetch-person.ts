import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

export interface IPerson {
  name: string;
  birth_year: string;
}

export class Person {
  constructor(
      public name: string,
      public birthYear: string,
  ) {}
}

export function fetchPerson(id: number): Observable<Person> {
  return ajax.getJSON<IPerson>(`https://swapi.co/api/people/${id}/`).pipe(map((person) => {
    return new Person(person.name, person.birth_year);
  }));
}
