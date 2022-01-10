import { emptyFieldGenerator, CellState, fieldGenerator, Cell } from './Field';

const { empty, bomb, hidden } = CellState;

const cellWithBombFilter = (cell: Cell) => cell === bomb;

describe('Field Generator', () => {
  describe('emptyFieldGenerator tests', () => {
    it('2 x 2', () => {
      expect(emptyFieldGenerator(2)).toStrictEqual([
        [empty, empty],
        [empty, empty],
      ]);
    });
    it('3 x 3', () => {
      expect(emptyFieldGenerator(3)).toStrictEqual([
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty],
      ]);
    });
    it('3 x 3 with hidden state', () => {
      expect(emptyFieldGenerator(3, hidden)).toStrictEqual([
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
      ]);
    });
  });
  describe('Simple cases', () => {
    it('Wrong density', () => {
      const errorText = 'Probability must between 0 and 1';
      expect(() => fieldGenerator(1, -1)).toThrow(errorText);
      expect(() => fieldGenerator(1, 2)).toThrow(errorText);
    });
    it('Smallest possible field without mine', () => {
      expect(fieldGenerator(1, 0)).toStrictEqual([[empty]]);
    });
    it('Smallest possible field with mine', () => {
      expect(fieldGenerator(1, 1)).toStrictEqual([[bomb]]);
    });
    it('2 x 2 field with mines', () => {
      expect(fieldGenerator(2, 1)).toStrictEqual([
        [bomb, bomb],
        [bomb, bomb],
      ]);
    });
    it('2 x 2 field with 50% probability', () => {
      const field = fieldGenerator(2, 0.5);
      const flatField = field.flat();

      console.table(field);
      console.table(flatField);

      const cellsWithBombs = flatField.filter((cell) => cell === bomb);
      const emptyCells = flatField.filter((cell) => cell === 2);

      expect(cellsWithBombs).toHaveLength(2);
      expect(emptyCells).toHaveLength(2);
    });
    it('Real game field size = 10x10 with 1/4 mined cells (25 mines)', () => {
      const size = 10;
      const mines = 25;

      const probability = mines / (size * size);
      const field = fieldGenerator(size, probability);

      console.table(field);

      const flatField = field.flat();

      expect(flatField.filter(cellWithBombFilter)).toHaveLength(25);
    });
    it('Big field without mine', () => {
      expect(fieldGenerator(10, 0)).toStrictEqual([
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
      ]);
    });
  });
});