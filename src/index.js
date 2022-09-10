import './style.css';
import getData from './module/getData.js';
import { newLike, getLike } from './module/likeApi.js';
import CommentsPopup from './module/popupComments.js';
import heartIcon from './images/heart-icon.svg';
import logo from './images/logo.png';

const availableMovies = document.querySelector('.movie-num');
const movieList = document.querySelector('.movie-list');
const logoIcon = document.querySelector('.logo');

logoIcon.src = logo;
const DisplayLikes = async (item) => {
  const likesNumber = await getLike();
  likesNumber.forEach((e) => {
    if (e.item_id === item.id) {
      item.querySelector('.num-like').innerHTML = e.likes;
    }
  });
};
const showMovie = (imageUrl, name, id) => {
  const item = document.createElement('li');
  item.classList.add('singleMovie');
  item.id = id;
  item.innerHTML = `
  <img class="show-image" src="${imageUrl}" alt="${name}" />
  <div class="name-like">
  <h3 class="movie-name"> ${name} </h3>
  <img class="like-image" src="${heartIcon}" alt="like" />
  <p class="num-like"></P>
  </div>
  <p class="text-like">Like</P>
  <div class="btns">
  <button id="btnId-${id}" class="comment-btn btn">Comments</button>
  <button id="${id}" class="reservation-btn btn">Reservation</button>
  </div>
  `;
  return item;
};
const displayMovieList = async () => {
  try {
    const data = await getData();
    availableMovies.innerHTML = `Available Movies ${data.length}`;

    data.forEach((item) => {
      const {
        id,
        image: { original: imageUrl },
        name,
      } = item;
      const movieItem = showMovie(imageUrl, name, id);
      movieList.appendChild(movieItem);
    });
  } finally {
    const likeIcon = document.querySelectorAll('.like-image');
    likeIcon.forEach((item) => {
      item.addEventListener('click', (e) => {
        newLike(e.target.parentElement.parentElement.id);
        const currentLike = e.target.parentElement.children[2];
        const preLike = +currentLike.innerText;
        currentLike.innerText = preLike + 1;
      });
    });
    document.querySelectorAll('.singleMovie').forEach((e) => {
      DisplayLikes(e);
    });
  }
};

window.addEventListener('load', () => {
  displayMovieList();
  DisplayLikes();
});
// Add event listener for comments popup button
// eslint-disable-next-line no-undef
const commentBtn = document.querySelector(`#btnId-${id}`);
const commentWrapper = document.querySelector('#commentCont');
commentBtn.addEventListener('click', () => {
  commentWrapper.innerHTML = '';
  CommentsPopup.renderPopUp();
});