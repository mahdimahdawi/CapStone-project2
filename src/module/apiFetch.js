const INVOLVEMENT_API_BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Imf4csndvBnR19rGhvHc';

export const createComment = async (id, name, comment) => {
  const formData = {
    item_id: id,
    username: name,
    comment,
  };
  const res = await fetch(`${INVOLVEMENT_API_BASE_URL}/comments?item_id=${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  return res;
};

export const getComments = async (id) => {
  const res = await fetch(`${INVOLVEMENT_API_BASE_URL}/comments?item_id=${id}`, { method: 'GET' });
  const comments = await res.json();
  return comments;
};