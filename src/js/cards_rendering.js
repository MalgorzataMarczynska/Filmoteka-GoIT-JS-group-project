import { popularMovies } from './main_fetch';
import { hideModalLoader } from './loader_spinner';

export const gallery = document.querySelector('.film-cards');

export function renderMovies(page, results = [], genres) {
  gallery.innerHTML = '';
  const markup = results
    .map(
      ({ poster_path, title, genre_ids, vote_average, release_date, id }) => {
        const genresId = genres.map(genre => genre.id);
        const genreNames = genres.map(genre => genre.name);
        const genresNames = [];
        genre_ids.forEach(id => {
          genresNames.push(genresId.indexOf(id));
          return genresNames;
        });
        let namesOfGenre = 'unknown';
        if (genre_ids) {
          namesOfGenre = genresNames
            .map(idik => genreNames[idik])
            .slice(0, 3)
            .join(', ');
        }

        const dots = '...';
        const cuttedTitle = title.slice(0, 35) + dots;
        const cuttedAlt = title.slice(0, 15);
        const homePageTitle = title.length >= 40 ? cuttedTitle : title;

        let posterImage = `wmyYQbahIy4SF2Qo6qNBBkJFg7z.jpg`;
        if (poster_path) {
          posterImage = poster_path;
        }
        let releaseYear = 'unknown';
        if (release_date) {
          releaseYear = release_date.slice(0, 4);
        }
        return `<div class='movie-card' data-movieid='${id}'>       
          <img class='movie-card__image' src='https://image.tmdb.org/t/p/w500/${posterImage}' alt='${cuttedAlt}' data-movieId='${id}' loading='lazy' />
  <div class='movie-card__info'>
   <p class='info__title'>${homePageTitle}</p>
   <p class='info__adds'>${namesOfGenre} | ${releaseYear}</p>
   <p class='info__adds info__adds--vote'>${vote_average}</p>   
        </div></div>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('afterbegin', markup);
}

export function renderModalMovie({
  poster_path,
  title,
  original_title,
  genres,
  vote_average,
  vote_count,
  popularity,
  overview,
  id,
}) {
  const genreNames = genres
    .map(genre => genre.name)
    .slice(0, 3)
    .join(', ');

  let posterImage = `wmyYQbahIy4SF2Qo6qNBBkJFg7z.jpg`;
  if (poster_path) {
    posterImage = poster_path;
  }
  const markup = `<div class="modal-container-film" data-movieid='${id}'>
                <img class="modal-img" src='https://image.tmdb.org/t/p/w500/${poster_path}' alt='${title}' loading='lazy'/>
                <div class="film-details">
                    <h2 class="film-details__main-title" >${title}</h2>
                    <ul class="details-list list">
                        <li class="details-list__item">
                            <p class="details-list_title">Vote / Votes</p>
                            <span class="details-list__info1">${vote_average}</span>&nbsp/&nbsp<span
                                class="details-list__info2">${vote_count}</span>
                        </li>
                        <li class="details-list__item">
                            <p class="details-list_title">Popularity</p>
                            <span class="details-list__info2">${popularity}</span>
                        </li>
                        <li class="details-list__item">
                            <p class="details-list_title">Original Title</p>
                            <span class="details-list__info2 ">${original_title}</span>
                        </li>
                        <li class="details-list__item">
                            <p class="details-list_title">Genre</p>
                            <span class="details-list__info2">${genreNames}</span>
                        </li>
                    </ul>
                    <h3 class="film-details__secondary-title">About</h3>
                    <p class="film-details__about">${overview}</p>
                    <ul class="buttons-list list">
                    </ul>
                    <div class='adds__buttons'>
    <button class='button button--modal button--inactive button--watched' type='button'>Add to watched</button>
    <button class='button button--modal button--inactive button--queue' type='button'>Add to queue</button>
    </div>
                </div>
            </div>`;
  hideModalLoader();
  const modalContent = document.querySelector('.modal-content');
  modalContent.innerHTML = markup;
}
