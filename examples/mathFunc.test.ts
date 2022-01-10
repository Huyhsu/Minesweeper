import { add } from './mathFunc';

describe('Math functions tests', () => {
  it('check add function', () => {
    expect(add(1, 2)).toBe(3);
  });
});
