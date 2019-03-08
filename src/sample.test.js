import { add, multiply } from './sample';

describe('sample', () => {
  it('add', () => {
    const value = add(2, 3);
    expect(value).toBe(5);
  });

  it('multiply', () => {
    const value = multiply(4, 5);
    expect(value).toBe(20);
  });

  it('add & multiply', () => {
    const value = add(1, multiply(2, 3));
    expect(value).toBe(7);
  });
});
