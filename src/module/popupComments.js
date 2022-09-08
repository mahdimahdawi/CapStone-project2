import {
  createComment, getComments,
} from './apiOperations.js';

export default class comments {
  displayCard(show, like) {
    let likeCount = 0;
    if (like.length > 0) {
      likeCount = like[0].likes;
    }

    // const card = document.createRange().createContextualFragment(`
    // <div class="card">
    //   <img src="${show.image.medium}" alt="${show.name}" class="card-img">
    //   <div class="card-details">
    //   <h3>${show.name.toUpperCase()}</h3>
    //   <div class="like-section">
    //   <span data-id="${show.id}" id="like_btn_${show.id}">
    //   <i class="fa-regular fa-heart fa-2x"></i>
    //   </span>
    //   <p id="likeCount_displayed_${show.id}">${likeCount} ${likeCount > 1 ? 'Likes' : 'Like'}</p>
    //   </div>
    //   </div>
    //   <div class="card-btns">
    //   <button data-id="${show.id}" id= "btnId-${show.id}" class="comment-btn" type="button">Comments</button>
    //   </div>
    //   </div>`);
    // const cardContainer = document.querySelector('.main-container');
    // cardContainer.append(card);

    // const likeBtnEvent = document.querySelector(`#like_btn_${show.id}`);
    // const likeCountDisplayed = document.querySelector(`#likeCount_displayed_${show.id}`);
    // likeBtnEvent.addEventListener('click', async () => {
    //   const id = likeBtnEvent.getAttribute('data-id');
    //   const child = likeBtnEvent.childNodes;
    //   child[1].classList.add('liked');
    //   await this.likeShow(id);
    //   const currentLike = parseInt(likeCountDisplayed.innerHTML.split(' ')[0], 10);
    //   const newLike = currentLike + 1;
    //   if (newLike > 1) {
    //     likeCountDisplayed.innerHTML = `${newLike} Likes`;
    //   } else {
    //     likeCountDisplayed.innerHTML = `${newLike} Like`;
    //   }
    //   child[1].classList.remove('liked');
    // });

    const commentBtn = document.querySelector(`#btnId-${show.id}`);
    const commentWrapper = document.querySelector('#commentCont');
    commentBtn.addEventListener('click', () => {
      commentWrapper.innerHTML = '';
      this.renderPopUp(show);
    });
  }

  // async getShows() {
  //   const shows = await getShows();
  //   const likes = await getLikes();
  //   const showCount = document.querySelector('#show_count');
  //   showCount.innerHTML = this.countShows(shows);
  //   shows.forEach((show) => {
  //     const like = likes.filter((like) => {
  //       if (parseInt(like.item_id, 10) === parseInt(show.id, 10)) {
  //         return like;
  //       }
  //       return false;
  //     });
  //     this.displayCard(show, like);
  //   });
  // }

  // countShows(shows) {
  //   this.length = shows.length;
  //   return this.length;
  // }

  countComments(comments) {
    this.length = comments.length;
    return this.length;
  }

  // async likeShow(showId) {
  //   this.res = await likeShowOps(showId);
  // }

  async commentShow(id) {
    this.res = await getComments(id);
  }

  async createComment(id, name, comment) {
    document.querySelector('.name-input').value = '';
    document.querySelector('.insignt').value = '';
    this.res = await createComment(id, name, comment);
  }

  async renderPopUp(show) {
    const comments = await getComments(show.id);
    let html = `
    <div class="comment-section-container">
      <i class="fa fa-times" aria-hidden="true"></i>
      <div class="image-container" id="">
        <img  src="${show.image.medium}">
      </div>
      <div class="info-container">
        <h3 class="showName">${show.name.toUpperCase()}</h3>
        <p class="desc">${show.summary}</p>
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