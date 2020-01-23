import { fetchPerson, Person } from './fetch-person';

describe('Lecture 2 - fetchPerson', () => {
  it('should return an instance of a model (using aync-await)', async () => {
    const person = await fetchPerson(1).toPromise();

    expect(person instanceof Person).toBeTrue();
    expect(person.name).toBe('Luke Skywalker');
    expect(person.birthYear).toBe('19BBY');
  })

  it('should return an instance of a model (using DoneFn)', (done: DoneFn) => {
    fetchPerson(1).subscribe((person) => {
      expect(person instanceof Person).toBeTrue();
      expect(person.name).toBe('Luke Skywalker');
      expect(person.birthYear).toBe('19BBY');

      done();
    });
  })
});
