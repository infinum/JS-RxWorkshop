import { Observable, of } from 'rxjs';

export interface IPerson {
  name: string;
  birth_year: string;
}

export class Person {
  constructor(public name: string, public birthYear: string) {}
}

export function fetchPerson(id: number): Observable<Person> {
  console.log(id);
  return of(null);
}
