import getData from './getData.js';
import {
  getEpisodes, createComment, getComments,
} from './apiFetch.js';

export default class CommentsPopup {
  displayCard(episode) {
    const card = document.createRange().createContextualFragment(`
    <div class="card">
      <img src="${data.image.medium}" alt="${data.name}" class="card-img">
      <div class="card-details">
      <h3>${data.name.toUpperCase()}</h3>
      </div>
      <div class="card-btns">
      <button data-id="${data.id}" id= "btnId-${data.id}" class="comment-btn" type="button">Comments</button>
      </div>
      </div>`);
    const cardContainer = document.querySelector('.main-container');
    cardContainer.append(card);
    const commentBtn = document.querySelector(`#btnId-${data.id}`);
    const commentWrapper = document.querySelector('#commentCont');
    commentBtn.addEventListener('click', () => {
      commentWrapper.innerHTML = '';
      this.renderPopUp(data);
    });
  }

  countComments(comments) {
    this.length = comments.length;
    return this.length;
  }

  async commentShow(id) {
    this.res = await getComments(id);
  }

  async createComment(id, name, comment) {
    document.querySelector('.name-input').value = '';
    document.querySelector('.insignt').value = '';
    this.res = await createComment(id, name, comment);
  }

  async renderPopUp(episode) {
    const comments = await getComments(episode.id);
    let html = `
    <div class="comment-section-container">
      <i class="fa fa-times" aria-hidden="true"></i>
      <div class="image-container" id="">
        <img  src="${getData.imageUrl}">
      </div>
      <div class="info-container">
        <h3 class="showName">${getData.name}</h3>
        <p class="desc">${getData.summary}</p>
      </div>
      <div class="display-comment">
        <h3>Comments (<span id= "comments-count">${comments.length ? comments.length : 0}</span>)</h3>
        <ul class= "listItems" >`;
    if (Array.isArray(comments) && comments.length > 0) {
      comments.forEach((comment) => {
        html += `<li>${comment.creation_date} <span class="comment-username">${comment.username}:</span> ${comment.comment}</li>`;
      });
    }
    html += `</ul> 
      </div>
      <form action="#" class="commentForm">
        <h3>Add Comment</h3>
        <div><input type="text" class="name-input" placeholder="Your Name" required></div>
        <div><textarea name="insight" id="insignt" class="insignt" cols="30" placeholder="Your Insight" rows="8"></textarea></div>
        <input type="submit" class="submitBtn" value="Submit" id="${show.id}">
      </form>
    </div>`;
    const commentCont = document.getElementById('commentCont');
    commentCont.innerHTML += html;

    const form = document.querySelector('.commentForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const itemId = document.querySelector('.submitBtn').getAttribute('id');
      const username = document.querySelector('.name-input').value;
      const comment = document.querySelector('.insignt').value;
      await this.createComment(itemId, username, comment);
      const comments = await getComments(show.id);
      const commentsCount = document.querySelector('#comments-count');
      commentsCount.innerHTML = '';
      commentsCount.innerHTML = comments.length;
      const listItems = document.querySelector('.listItems');
      listItems.innerHTML = '';
      let lists = '';
      comments.forEach((comment) => {
        lists += `<li>${comment.creation_date} <span class="comment-username">${comment.username}:</span> ${comment.comment}</li>`;
      });
      listItems.innerHTML = lists;
    });
    const commentWrapper = document.querySelector('.comment-section-container');
    commentCont.classList.remove('dn');
    const close = document.querySelector('.fa.fa-times');
    close.addEventListener('click', (e) => {
      e.preventDefault();
      commentWrapper.classList.add('dn');
    });
  }
}