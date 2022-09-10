import CommentsPopup from '../module/popupComments.js';

test('Count the array of comments and render the number', () => {
  const comment = new CommentsPopup();
  const arr = [
    { comment: 1, creation_date: '2021-01-10', username: 'name1' },
    { comment: 1, creation_date: '2021-01-09', username: 'name2' },
    { comment: 1, creation_date: '2021-01-10', username: 'name3' },
    { comment: 1, creation_date: '2021-01-11', username: 'name4' },
    { comment: 1, creation_date: '2021-01-10', username: 'name5' },
  ];

  const length = comment.countComments(arr);
  expect(length).toBe(5);
});