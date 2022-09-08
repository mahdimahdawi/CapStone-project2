import { StoreLike, getLike, newLike } from '../__mock__/likeApi.js';

describe('Test for fetching Likes in Api', ()=> {
  test('Test for Number of like', ()=>{
    getLike().then((item) =>{
      expect(item.item_id).toBe(75);
    });
  });
  test('Test for the Number of Like', ()=>{
    getLike().then((item) => {
      expect(item.likes).toBe(5);
    });
  });
});

describe('Test to Store like in Api', ()=> {
  test('Test to Create like', ()=>{
    StoreLike().then((item) => {
      expect(item).toBe('created');
    });
  });
});

describe('Test for Add new Likes', ()=> {
  test('Test for Number of like', ()=>{
    newLike().then((item) =>{
      expect(item.item_id).toBe(73);
    });
  });
  test('Test for the Number of Like', ()=>{
    newLike().then((item) => {
      expect(item.likes).toBe(13);
    });
  });
});

