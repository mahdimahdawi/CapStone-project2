import updateCounter from './updateCommentCounter.js';

const commenuURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ggZLPPwjynSGZI0V2o7g/comments';
const addComment = async (movieID, userName, message) => {
  try {
    const result = await fetch(commenuURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_id: movieID,
        username: userName,
        comment: message,
      }),
    });

    updateCounter(userName, message);
    return await result.text();
  } catch (error) {
    return null;
  }
};

export default addComment;