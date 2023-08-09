import Button from "./Button";
const MovieCard = ({ movieData, selectMovie}) => {
  const imagePath = "https://image.tmdb.org/t/p/w500/";
  return (
    <div className="container">
      {movieData.map((movie) => (
        <div className="movie" key={movie.id} onClick={() => selectMovie(movie)}>
          {movie.poster_path ? (
            <img
              className="movie-poster"
              src={`${imagePath}${movie.poster_path}`}
              alt=""
            />
          ) : (
            <div className="movie-placeholder">No image found</div>
          )}
          <Button onClick={() => alert('You must be signed in')}>Add to List +</Button>
        </div>
      ))}
    </div>
  );
};
export default MovieCard;
