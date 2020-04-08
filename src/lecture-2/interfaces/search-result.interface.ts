import { IPerson } from './person.interface';

export interface ISearchResult {
  count: number;
  results: Array<IPerson>;
}
