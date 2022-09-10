import getComment from './getComment.js';

const counter = async (id) => {
  const comments = await getComment(id);
  return comments.length;
};

export default counter;