import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const { language } = useSelector((state) => state.languages);
  const apiKey = "e0dd7fb1ec73d693e8c236644b38dc1f";

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=${language}`
      );
      setMovies(res.data.results);
    };
    fetchMovies();
  }, [language]);
  
  return (
  
    <div className="wraper-container">
      <h2>Movies</h2>
      <div className="wraper-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="wraper-card">
              <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="wraper-poster"
                />
              <div className="wraper-info">
                <h3>{movie.title}</h3>
                <h3>{movie.name}</h3>
                <p>{movie.overview.slice(0, 100)}...</p>
                <span className="wraper-rating">
                  ⭐ {movie.vote_average.toFixed(1)}/10
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>Loading Movies...</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;