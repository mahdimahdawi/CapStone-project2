const updateCounter = (userName, message) => {
  const commentContainer = document.createElement('div');
  const count = document.querySelector('.comment-count');
  const countValue = +count.textContent.trim();
  count.innerHTML = `${countValue + 1}`;
  const para = document.createElement('p');
  para.className = 'comment-list';
  const today = new Date();
  para.innerHTML = `${
    `Post Date : ${today.getFullYear()}-${+today.getMonth() + 1}-${today.getDate()}`
  } Username : ${userName} Comment : ${message}`;
  commentContainer.appendChild(para);
  document.querySelector('.comment-container').appendChild(commentContainer);
};

export default updateCounter;