import { getPrimes } from './math';

describe('getPrimes', () => {
  it('should return an array of prime numbers if the end of the range is greater than 3', () => {
    expect(getPrimes(10)).toEqual([2, 3, 5, 7]);
  });

  it('should return an array that has just only 2 if the end of the range is 2', () => {
    expect(getPrimes(2)).toEqual([2]);
  });

  it('should return an empty array if the end of the range is less than 2', () => {
    expect(getPrimes(1)).toEqual([]);
  });
});