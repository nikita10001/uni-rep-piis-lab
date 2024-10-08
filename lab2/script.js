const movieTitles = {
  MOVIE_1: 'Супер фильм',
  MOVIE_2: 'Интересный фильм',
  MOVIE_3: 'Фильм фильм',
};

const personalMovieDB = {
  isPrivate: false,
  movies: {
    [movieTitles.MOVIE_1]: 8.5,
    [movieTitles.MOVIE_2]: 9.0,
    [movieTitles.MOVIE_3]: 9.1,
  },
};

function displayMovies(movies, isPrivate) {
  if (isPrivate) {
    return;
  }

  const tableContainer = document.getElementById('movie-table');
  let table = '<table><tr><th>Название фильма</th><th>Оценка</th></tr>';

  for (const [title, rating] of Object.entries(movies)) {
    table += `<tr><td>${title}</td><td>${rating}</td></tr>`;
  }
  table += '</table>';
  tableContainer.innerHTML = table;
}

displayMovies(personalMovieDB.movies, personalMovieDB.isPrivate);
