// https://api.tvmaze.com/seasons/1/episodes
import close from '../../images/close.png';
import getComment from './getComment.js';
import counter from './commentcounter.js';
import createFormContainer from './commentform.js';
import getData from '../modules/data.js';

const main = document.querySelector('main');
const popup = document.querySelector('.popup-dialog');
const formContainer = document.createElement('form');
const commentContainer = document.createElement('div');
commentContainer.className = 'comment-container';

formContainer.className = 'form';

const showPopupDialog = async (id) => {
  const commentCounter = document.createElement('h2');
  const result = await getData();
  const index = +id - 1;

  const newMovies = result[index];
  const comments = await getComment(newMovies.id);
  const totalComment = await counter(newMovies.id);
  main.style.display = 'none';
  popup.style.display = 'block';
  popup.innerHTML = `
        <div class="popup-top">
            <img src="${newMovies.image.medium}" class='popup-image' alt="image">
             <img src="${close}" class='close-btn' alt="image">
        </div>
            <h2 class="title"> ${newMovies.name}</h2>
        <ul class="detail">
            <li>Type: ${newMovies.type}</li>
            <li>Air Date:  ${newMovies.airdate}</li>
            <li>Airtime: ${newMovies.airtime}</li>
            <li>Rating: ${newMovies.rating.average}</li>
        </ul>`;

  commentCounter.className = 'title';
  commentContainer.innerHTML = '';
  commentCounter.innerHTML = `Comment (<span class='comment-count'>${totalComment}</span>)`;
  popup.appendChild(commentCounter);

  comments.forEach((movie) => {
    const para = document.createElement('p');
    para.className = 'comment-list';
    para.innerHTML = `Post Date : ${movie.creation_date} User : ${movie.username} Comment :  ${movie.comment}`;
    commentContainer.appendChild(para);
  });
  popup.appendChild(commentContainer);
  createFormContainer(newMovies.id);
};

export default showPopupDialog;
