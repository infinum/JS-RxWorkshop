import { ajax } from 'rxjs/ajax';
import { mockApi } from '../../helpers/mock-api.helper';
import { IPerson } from '../interfaces/person.interface';
import { Person } from '../models/person.model';
import { fetchPerson } from './fetch-person';

describe('#lecture-2 #task-2-1 fetchPerson', () => {
  const luke: IPerson = {
    name: 'Luke Skywalker',
    birth_year: '19BBY', // eslint-disable-line @typescript-eslint/camelcase
  };

  beforeEach(() => {
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it('should return an instance of a model (using aync-await)', async () => {
    spyOn(ajax, 'getJSON').and.callThrough();
    mockApi('https://swapi.co/api/people/1/', luke);

    expect(ajax.getJSON).toHaveBeenCalledTimes(0);

    const person = await fetchPerson(1).toPromise();

    expect(person instanceof Person).toBeTrue();
    expect(person.name).toBe('Luke Skywalker');
    expect(person.birthYear).toBe('19BBY');
    expect(ajax.getJSON).toHaveBeenCalledTimes(1);
  });

  it('should return an instance of a model (using DoneFn)', (done: DoneFn) => {
    spyOn(ajax, 'getJSON').and.callThrough();
    mockApi('https://swapi.co/api/people/1/', luke);

    expect(ajax.getJSON).toHaveBeenCalledTimes(0);

    fetchPerson(1).subscribe((person) => {
      expect(person instanceof Person).toBeTrue();
      expect(person.name).toBe('Luke Skywalker');
      expect(person.birthYear).toBe('19BBY');
      expect(ajax.getJSON).toHaveBeenCalledTimes(1);

      done();
    });
  });
});
