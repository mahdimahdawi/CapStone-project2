import heartIcon from './images/heart-icon.svg';
import './style.css';
import getData from './module/getData.js';
import { newLike, getLike } from './module/likeApi.js';

const availableMovies = document.querySelector('.movie-num');
const movieList = document.querySelector('.movie-list');

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
  <button id="${id}" class="comment-btn btn">Comments</button>
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
