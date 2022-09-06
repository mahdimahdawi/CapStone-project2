import _ from 'lodash';

import './style.css';
import getData from './module/getData.js';
const availableMovies = document.querySelector('.movie-num');
const movieList = document.querySelector('.movie-list');


const displayMovieList = async () => {
  try {
    const data = await getData();
    availableMovies.innerHTML = data.length;

    data.forEach((item) => {
      const {
        id,
        image: { original: imageUrl },
        name,
      } = item;
      const movieItem = showMovie(imageUrl, name, id);
      movieList.appendChild(movieItem);
    })
  } finally {

  }
}

const showMovie = (imageUrl, name, id) => {
  const item = document.createElement('li');
  item.classList.add('singleMovie');
  item.id = id;
  item.innerHTML = `
  <img class="show-image" src="${imageUrl}" alt="${name}" />
  <div class="name-like">
  <h3 class="movie-name"> ${name} </h3>
  <img class="like-image" src="" alt="like" />
  <p class="num-like">${id}</P>
  </div>
  <div class="btns">
  <button id="${id}" class="comment-btn btn">Comments</button>
  <button id="${id}" class="reservation-btn btn">Reservation</button>
  </div>
  `;
  return item;
}

displayMovieList();
