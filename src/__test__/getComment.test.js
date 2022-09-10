import getComment from '../module/getComment.js';

const commentList = [
  { item_id: 1, username: 'meshu', comment: 'Love it seriously' },
];

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(commentList),
}));

describe('Test Get comment function', () => {
  it('Retrive comment', async () => {
    const commentList = await getComment(1);
    expect(commentList.length).toBe(1);
  });

  it('Number of Fetch call', async () => {
    await getComment(2);
    expect(fetch).not.toBeCalledTimes(3);
  });

  it('Number of Fetch call', async () => {
    await getComment(1);
    expect(fetch).toBeCalledTimes(3);
  });
});
