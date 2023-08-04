import { fetchLibrary } from './library_fetch';
import { paginationPlace } from './pagination';
import { gallery } from './cards_rendering';
import './open_modal';
import './add_to_queue';
import './add_to_watched';
import './scroll_up_button';

// DOM elements
const myLibraryButton = document.querySelector(
  '.navigation__item:nth-child(2)'
);
const watchedListButton = document.querySelector('[loadWatched]');
const queueListButton = document.querySelector('[loadQueued]');

// Local storage
let watchedMovies = [JSON.parse(localStorage.getItem('movies-watched'))];
let queuedMovies = [JSON.parse(localStorage.getItem('movies-queued'))];

gallery.innerHTML = '';
paginationPlace.innerHTML = '';

setTimeout(() => {
  loadLibrary();
  loadWatchedList();
}, 500);

export function loadLibrary() {
  gallery.innerHTML = '';
  paginationPlace.innerHTML = '';
  loadWatchedList();
}

async function loadWatchedList() {
  // button's visual changes
  watchedListButton.classList.add('button--active');
  watchedListButton.classList.remove('button--inactive');
  paginationPlace.innerHTML = '';
  queueListButton.classList.add('button--inactive');
  queueListButton.classList.remove('button--active');

  // change showed movies

  if (watchedMovies[0] === null || watchedMovies[0].length === 0) {
    paginationPlace.innerHTML = '';
    gallery.innerHTML = `<h2 class="warning">You don't have any watched movies yet!</h2>`;
    return;
  } else {
    paginationPlace.innerHTML = '';

    fetchLibrary(watchedMovies[0]);
  }
}
async function loadQueueList() {
  // button's visual changes
  queueListButton.classList.add('button--active');
  queueListButton.classList.remove('button--inactive');

  watchedListButton.classList.add('button--inactive');
  watchedListButton.classList.remove('button--active');

  // change showed movies
  gallery.innerHTML = '';
  if (queuedMovies[0] === null || queuedMovies[0].length === 0) {
    gallery.innerHTML = `<h2 class="warning">You don't have any queued movies yet!</h2>`;
  } else {
    fetchLibrary(queuedMovies[0]);
  }
}
myLibraryButton.addEventListener('click', loadLibrary);

watchedListButton.addEventListener('click', loadWatchedList);
queueListButton.addEventListener('click', loadQueueList);
