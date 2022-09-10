const counter = async () => {
  const comments = [
    { item_id: 1, username: 'meshu', comment: 'Love it seriously' },
    { item_id: 1, username: 'meshu', comment: 'Love it seriously' },
  ];
  return comments.length;
};

export default counter;
