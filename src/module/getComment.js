const commenuURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/EYuha4IJbZNmX75tOKPh/comments';
const getComment = async (id) => {
  try {
    const result = await fetch(`${commenuURL}?item_id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const comments = await result.json();

    if (comments.error) {
      return [];
    } return comments;
  } catch (error) {
    return [];
  }
};

export default getComment;
