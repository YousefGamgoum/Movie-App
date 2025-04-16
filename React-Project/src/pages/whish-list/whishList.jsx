import React from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { updateCurrentLang } from '../../store/slice/language';
import styles from './whishList.module.css';
import { addWishlist,removeWishlist } from '../../store/slice/wishlistSlice';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />


const whishList=() =>{
   
  const wishlist = useSelector((state) => state.wishlist.movies);
  const dispatch = useDispatch();
  
  const handleToggleWishlist = (movie) => {
    const isfindWishlist = wishlist.some((item) => item.id === movie.id);
    dispatch(isfindWishlist ? removeWishlist(movie) : addWishlist(movie));
  };


  return (
    
    <div className={styles.container} >
      
    <h2 className={styles.title}>Watch list</h2>
    {wishlist.length === 0 ? (
      // no movie
      <div className={styles.emptyState}>
        <i className={`fas fa-heart-broken ${styles.brokenHeart}`}></i>
        <h4 className={styles.emptyText}>No Movies in watch list</h4>
        <Link to="/">
          <button className={styles.backButton}>Back to home</button>
        </Link>
      </div>
    ) : (
      // have a movie
      <div className={styles.movieGrid}>
      {wishlist.map((movie) => {
        console.log("movie:", movie);
        const isfindWishlist = wishlist.find((item) => item.id === movie.id);
        return (
          <div key={movie.id} className={styles.movieCard}>
            <div className={styles.posterWrapper}>
              <img
                src={movie.poster}
                className={styles.poster}
                alt={movie.title}
              />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.titleRow}>
                <h5 className={styles.movieTitle}>{movie.title}</h5>
                <i
  className={`fas fa-heart ${styles.heartIcon} ${isfindWishlist ? styles.heartFilled : ''}`}
  onClick={() => handleToggleWishlist(movie)}
></i>
              </div>
              <p className={styles.movieDate}>{movie.date}</p>
              <div className={styles.rating}>
                {[...Array(5)].map((_, index) => (
                  <i
                    key={index}
                    className={`${
                      index < movie.rating ? 'fas fa-star' : 'far fa-star'
                    } ${styles.star}`}
                  ></i>
                ))}
                <span className={styles.votes}>{movie.votes}</span>
              </div>
              <p className={styles.description}>
                {movie.description.slice(0, 100)}
              </p>
              
            </div>
          </div>
        );
      })}
    </div>
  )}
</div>
);
}
export default whishList;