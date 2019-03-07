import { formatNumber } from '../number';

describe('formatNumber helper', () => {
  // Arrange
  const value = 56.76987654016381;

  it('should return somthing', () => {
    // Act
    const result = formatNumber(value);

    // Assert
    expect(result).not.toBeNull();
  });

  it('should convert a number into a string', () => {
    // Act
    const result = formatNumber(value);

    // Assert
    expect(typeof result).toBe('string');
  });

  it('should keep only 5 decimals (default)', () => {
    // Act
    const result = formatNumber(value);

    // Assert
    expect(result).toBe('56.76988');
  });

  it('should keep only 2 decimals', () => {
    // Act
    const result = formatNumber(value, 2);

    // Assert
    expect(result).toBe('56.77');
  });
});
