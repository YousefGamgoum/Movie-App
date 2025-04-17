import React from 'react';
import styles from './MovieCard.module.css';
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
// import { toggleWishlist } from '../../redux/wishlistSlice'; 

function MovieCard({ movie, onClick }) {
  const dispatch = useDispatch();
  // const wishlistItems = useSelector((state) => state.wishlist.items);
  // const isInWishlist = wishlistItems.some((item) => item.id === movie.id);

  const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'placeholder-image-url';
  const formattedDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'TBA';

  // const handleHeartClick = (e) => {
  //   e.stopPropagation();
  //   dispatch(toggleWishlist(movie.id));
  // };

  return (
    <div className={styles.card} onClick={() => onClick && onClick(movie)}>
      <img src={imageUrl} alt={movie.title} className={styles.poster} />
      <div className={styles.details}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.date}>{formattedDate}</p>
        <div className={styles.rating}>
          {[...Array(Math.round(movie.vote_average / 2))].map((_, i) => (
            <AiFillStar key={i} className={styles.star} />
          ))}
          <span className={styles.voteCount}>({movie.vote_count})</span>
        </div>
        <p className={styles.overview}>{movie.overview?.substring(0, 80)}...</p>
        {/* <button className={styles.heartButton} onClick={handleHeartClick}>
          {isInWishlist ? <AiOutlineHeart className={styles.heartFilled} /> : <AiOutlineHeart className={styles.heartOutline} />}
        </button> */}
      </div>
    </div>
  );
}

export default MovieCard;