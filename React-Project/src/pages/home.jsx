// pages/Home.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWishlist, removeWishlist } from '../store/slice/wishlistSlice';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.movies);
  const API_KEY = '33faf8f966f0a01f5334e6ee43da19f8';

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch movies');
        return res.json();
      })
      .then((data) => {
        const mappedData = data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          date: movie.release_date, 
          rating: Math.round(movie.vote_average / 2),
          votes: movie.vote_count,
          description: movie.overview,
          poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        }));
        setMovies(mappedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleWishlistToggle = (movie) => {
    const exists = wishlist.find((item) => item.id === movie.id);
    if (exists) {
      dispatch(removeWishlist(movie)); 
    } else {
      dispatch(addWishlist(movie));
    }
  };


  return (
    <div className="container mt-4">
      <h2 className="mb-3">Movies</h2>
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={movie.poster}
                className="card-img-top"
                alt={movie.title}
                style={{ height: '350px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <button
                  className="btn btn-warning"
                  onClick={() => handleWishlistToggle(movie)}
                >
                  <i
                    className={`fa fa-heart me-1 ${
                      wishlist.find((item) => item.id === movie.id) ? 'filled' : ''
                    }`}
                  ></i>
                  {wishlist.find((item) => item.id === movie.id)
                    ? 'Remove from Wishlist'
                    : 'Add to Wishlist'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;