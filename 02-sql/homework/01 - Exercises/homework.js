/* ¡Escribe tus comandos en este archivo! */

const ejercicio02 = 'SELECT * FROM movies WHERE duration < 90;';

const ejercicio03 = 'SELECT * FROM movies WHERE year > 1930 AND year < 1940;';

const ejercicio04 = 'SELECT * FROM movies WHERE tittle LIKE "%til%";';

const ejercicio05 = 'SELECT * FROM movies WHERE array_length(actors, 1) = 1;';

const ejercicio06 = 'SELECT title, ROUND(AVG(rating)) FROM movies, unnest (ratings) as rating GROUP BY title ORDER BY round DESC;';

const ejercicio07 = '';

module.exports = {
   ejercicio02,
   ejercicio03,
   ejercicio04,
   ejercicio05,
   ejercicio06,
   ejercicio07,
};
