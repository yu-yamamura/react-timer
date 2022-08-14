export const getPrimes = (maxRange: number) =>
  Array.from(Array(maxRange + 1).keys())
    .slice(2)
    .filter((n) => {
      for (let i = 2; i < n; i++) {
        if (n % i === 0) return false;
      }
      return true;
    });