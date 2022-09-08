import getData from '../__mock__/getData.js';

jest.mock('../module/getData.js');

describe('Fetching Data From API', () =>{
  test('Check For the Id', () => {
    getData().then((item) => {
      expect(item.id).toBe(73);
    });
  });
  test('Check For Name of the Movie', () =>{
    getData().then((item) =>{
      expect(item.name).toBe('Liberty');
    });
  });
  test('Check for type', ()=>{
    getData().then((item) => {
      expect(item.type).toBe('regular');
    });
  });
});
