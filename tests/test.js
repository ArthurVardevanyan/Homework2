const { expect } = require('chai');

describe('Sum numbers', () => {
  it('should add two numbers correctly', () => {
    const sum = 1 + 2;
    const expectedResult = 3;
    expect(sum).to.equal(expectedResult);
  });
});
