import './style.css';
import getData from './module/getData.js';
import { newLike, getLike } from './module/likeApi.js';
import heartIcon from './images/heart-icon.svg';
import logo from './images/logo.png';
import showPopupDialog from './module/comment.js';
import addComment from './module/addcomment.js';
import Display from './module/display.js';

const availableMovies = document.querySelector('.movie-num');
const movieList = document.querySelector('.movie-list');
const logoIcon = document.querySelector('.logo');
const popup = document.querySelector('.popup-dialog');

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
  <button class="comment-btn" data-id="${id}" >Comments</button>
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

    // implement the comment feature
    document.querySelector('.movie-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('comment-btn')) {
        const id = e.target.dataset;
        showPopupDialog(id.id);
      }
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

popup.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('add-comment')) {
    const userName = document.querySelector('input').value;
    const message = document.querySelector('textarea').value;
    const emptyUser = document.querySelector('.empty-name');
    const emptyComment = document.querySelector('.empty-comment');
    const { id } = e.target.dataset;
    if (userName === '' && message === '') {
      Display.blockComment(emptyComment);
      Display.blockUser(emptyUser);
    } else if (userName === '') {
      Display.blockUser(emptyUser);
      Display.noneComment(emptyComment);
    } else if (message === '') {
      Display.blockComment(emptyComment);
      Display.noneUser(emptyUser);
    } else {
      addComment(id, userName, message);
      Display.noneUser(emptyUser);
      Display.noneComment(emptyComment);
      document.querySelector('input').value = '';
      document.querySelector('textarea').value = '';
    }
  }
});

popup.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('close-btn')) {
    document.querySelector('.content').style.display = 'flex';
    document.querySelector('.popup-dialog').style.display = 'none';
  }
});
