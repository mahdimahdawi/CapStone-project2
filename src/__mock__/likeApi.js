const StoreLike = async () => Promise.resolve('created');

const getLike = async () => Promise.resolve({
  item_id: 75,
  likes: 5,
});

const newLike = async () => Promise.resolve({
  item_id: 73,
  likes: 13,
})

export { StoreLike, getLike, newLike };