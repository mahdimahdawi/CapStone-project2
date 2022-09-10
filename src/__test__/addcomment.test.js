import addComment from '../module/addcomment.js';

jest.mock('../src/module/addcomment.js');

describe('Test Add Comment Function', () => {
  it('Add Comment ', async () => {
    const status = await addComment(1);
    expect(status).toBe('created');
  });
});
