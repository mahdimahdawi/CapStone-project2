import CommentsPopup from '../module/popupComments.js';

test('Count the array of comments and render the number', () => {
  const comment = new CommentsPopup();
  const arr = [
    { comment: 1, creation_date: '2021-01-10', username: 'beky' },
    { comment: 1, creation_date: '2021-01-09', username: 'james' },
    { comment: 1, creation_date: '2021-01-10', username: 'nady' },
    { comment: 1, creation_date: '2021-01-11', username: 'brad' },
    { comment: 1, creation_date: '2021-01-10', username: 'mafi' },
  ];

  const length = comment.countComments(arr);
  expect(length).toBe(5);
});