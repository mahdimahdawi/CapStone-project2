import counter from '../__mock__/commentcounter.js';

jest.mock('../src/module/commentcounter.js');

describe('Test counter function', () => {
  it('Test counter at length 2', async () => {
    const result = await counter(1);
    expect(result).toBe(2);
  });

  it('Test counter not length 3', async () => {
    const result = await counter(1);
    expect(result).not.toBe(3);
  });

  it('Call counter', async () => {
    const result = await counter(1);
    expect(result).not.toBe(3);
  });
});
