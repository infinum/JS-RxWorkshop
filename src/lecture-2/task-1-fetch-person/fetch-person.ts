import { Observable, of } from 'rxjs';
import { Person } from '../models/person.model';

export function fetchPerson(id: number): Observable<Person> {
  console.log(id);
  return of(null);
}
