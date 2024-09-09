let numberOfFilms = prompt('Сколько фильмов вы уже посмотрели?');

let personalMovieDB = {
  count: numberOfFilms,
  movies: {},
};

function getFilmInfo() {
  let lastFilm = prompt('Один из последних просмотренных фильмов?');
  while (lastFilm === null || lastFilm === '') {
    lastFilm = prompt('Пожалуйста, введите название фильма.');
  }

  let rating = prompt('На сколько оцените его?');
  while (rating === null || rating === '') {
    rating = prompt('Пожалуйста, введите оценку.');
  }

  return { lastFilm, rating };
}

const { lastFilm: lastFilm1, rating: rating1 } = getFilmInfo();
const { lastFilm: lastFilm2, rating: rating2 } = getFilmInfo();

function checkInput(film, rating) {
  if (film === '' || rating === '' || film.length > 50) {
    return false;
  }
  return true;
}

if (checkInput(lastFilm1, rating1)) {
  personalMovieDB.movies[lastFilm1] = {
    name: lastFilm1,
    rating: rating1,
  };
} else {
  alert('Некорректный ввод для первого фильма!');
}

if (checkInput(lastFilm2, rating2)) {
  console.log('askdmakdamskldamlksdaslkdmalskdm');
  console.log(
    (personalMovieDB.movies[lastFilm2] = {
      name: lastFilm2,
      rating: rating2,
    })
  );
  console.log('askdmakdamskldamlksdaslkdmalskdm');

  personalMovieDB.movies[lastFilm2] = {
    name: lastFilm2,
    rating: rating2,
  };
} else {
  alert('Некорректный ввод для второго фильма!');
}

console.log(personalMovieDB);
