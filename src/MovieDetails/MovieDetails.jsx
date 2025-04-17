import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai';
import styles from './MovieDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
// import { addToWishlist, removeFromWishlist } from '../redux/wishlistSlice';
import MovieCard from '../Card/MovieCard';
import { useParams } from 'react-router-dom';

function MovieDetails() {
  const { id }=useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const apiKey = "33faf8f966f0a01f5334e6ee43da19f8";
  const dispatch = useDispatch();
  // const wishlist = useSelector((state) => state.wishlist.items);
  // const isMovieInWishlist = wishlist.some((item) => item.id === movie?.id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        setMovie(movieResponse.data);
      } catch (err) {
        setError('Failed to fetch movie details.');
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const recommendationsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}&language=en-US&page=1`
        );
        setRecommendations(recommendationsResponse.data.results);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}&language=en-US&page=1`
        );
        setReviews(reviewsResponse.data.results);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    if (id && apiKey) {
      fetchMovieDetails();
      fetchRecommendations();
      fetchReviews();
    }
  }, [id, apiKey]);

  // const handleAddToWishlist = () => {
  //   if (movie) {
  //     dispatch(addToWishlist(movie));
  //   }
  // };

  // const handleRemoveFromWishlist = () => {
  //   if (movie) {
  //     dispatch(removeFromWishlist(movie.id));
  //   }
  // };

  // const toggleWishlist = () => {
  //   if (movie) {
  //     dispatch(isMovieInWishlist ? removeFromWishlist(movie.id) : addToWishlist(movie));
  //   }
  // };

  if (loading) {
    return <div className={styles.loading}>Loading movie details...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!movie) {
    return <div></div>;
  }

  return (
    <div className={styles.movieDetailsContainer}>
     
      <div className={styles.movieHeader}>
        <div className={styles.posterWrapper}>
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/placeholder.jpg'}
            alt={movie.title}
            className={styles.moviePoster}
          />
        </div>
        <div className={styles.movieInfo}>
          <div className={styles.titleAndWishlist}>
            <h2 className={styles.movieTitle}>{movie.title}</h2>
            {/* <button className={styles.wishlistButton} onClick={toggleWishlist}>
              <AiOutlineHeart className={`${styles.heartIcon} ${isMovieInWishlist ? styles.inWishlist : ''}`} />
              <span className={styles.wishlistText}>{isMovieInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
            </button> */}
          </div>
          <div className={styles.rating}>
            <span className={styles.star}>
              {[...Array(Math.round(movie.vote_average / 2))].map((_, i) => (
                <AiFillStar key={i} className={styles.starIcon} />
              ))}
            </span>
            <span className={styles.voteCount}>({movie.vote_count} votes)</span>
          </div>
          <p className={styles.tagline}>{movie.tagline}</p>
          <p className={styles.overview}>{movie.overview}</p>
          <div className={styles.details}>
            <p><strong className={styles.detailLabel}>Release Date:</strong> {movie.release_date}</p>
            <p><strong className={styles.detailLabel}>Duration:</strong> {movie.runtime} minutes</p>
            <p><strong className={styles.detailLabel}>Languages:</strong> {movie.spoken_languages?.map((lang) => lang.english_name).join(', ') || 'N/A'}</p>
            <p><strong className={styles.detailLabel}>Genres:</strong> {movie.genres?.map((genre) => genre.name).join(', ') || 'N/A'}</p>
            {movie.homepage && (
              <p><a href={movie.homepage} target="_blank" rel="noopener noreferrer" className={styles.websiteLink}>Official Website</a></p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.recommendationsSection}>
        <h3 className={styles.sectionTitle}>Recommendations</h3>
        <div className={styles.recommendationsList}>
          {recommendations.length > 0 ? (
            recommendations.map((recommendation) => (
              <MovieCard
                key={recommendation.id}
                movie={recommendation}
                onClick={(recommendedMovie) => {
                  console.log('Clicked recommendation:', recommendedMovie.title);
                  
                }}
              />
            ))
          ) : (
            <p className={styles.noResults}>No recommendations available.</p>
          )}
        </div>
      </div>

      <div className={styles.reviewsSection}>
        <h3 className={styles.sectionTitle}>Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className={styles.reviewItem}>
              <h4 className={styles.reviewAuthor}>Author: {review.author}</h4>
              <p className={styles.reviewContent}>{review.content}</p>
              {review.author_details?.rating && (
                <div className={styles.reviewRating}>Rating: {[...Array(Math.round(review.author_details.rating / 2))].map((_, i) => <AiFillStar key={i} className={styles.starIconSmall} />)}</div>
              )}
            </div>
          ))
        ) : (
            <p className={styles.noResults}>No reviews available.</p>
          )}
      </div>
    </div>
  );
}

export default MovieDetails;