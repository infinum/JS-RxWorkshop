import { Observable, of } from 'rxjs';

export function timeout(timeoutMs: number): Observable<void> {
  console.log(timeoutMs);

  return of(null);
}
