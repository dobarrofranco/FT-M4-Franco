/* ¡Escribe tus comandos en este archivo! */

const ejercicio02 = 'SELECT * FROM movies WHERE duration>90;';

const ejercicio03 = 'SELECT * FROM movies WHERE year BETWEEN 1930 and 1940;';

const ejercicio04 = "SELECT * FROM movies WHERE title ILIKE '%til%';";

const ejercicio05 = 'SELECT movies FROM movies WHERE CARDINALITY(actors)=1;';

const ejercicio06 =
   'WITH unnested_ratings AS (SELECT title, unnest(ratings) FROM movies) SELECT title, AVG(unnested_ratings.unnest) FROM unnested_ratings GROUP BY title;';

const ejercicio07 =
   "SELECT actors FROM movies WHERE title ILIKE '%Fast and Furious%' AND year=2016 ORDER BY actors;";

module.exports = {
   ejercicio02,
   ejercicio03,
   ejercicio04,
   ejercicio05,
   ejercicio06,
   ejercicio07,
};
