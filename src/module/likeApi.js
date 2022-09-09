const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/2Lb5R8INkYDIZp9pThSI/likes/';

const StoreLike = async (data) => {
  const like = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return like;
};

const newLike = (id) => {
  const date = { item_id: `${id}` };
  StoreLike(date);
};

const getLike = async () => {
  let likes = await fetch(url);
  likes = await likes.json();
  return likes;
};

export { newLike, getLike };