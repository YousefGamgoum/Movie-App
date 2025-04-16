import React from "react";
import styles from "./Card.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../component/redux/WishlistSlice";

function Card({ show, onClick }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.includes(show.id);

  const imageUrl = `https://image.tmdb.org/t/p/w500${show.poster_path}`;
  const formattedDate = new Date(show.release_date || show.first_air_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const rating = Math.round((show.vote_average || 0) * 10);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(show.id));
  };

  const getRatingColor = (rating) => {
    if (rating >= 75) return "#21d07a";
    if (rating >= 65) return "#d2d531";
    if (rating >= 45) return "#d2a631";
    return "#db2360";
  };

  const createRatingCircle = (rating) => {
    const color = getRatingColor(rating);
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const ratingPercentage = rating / 100;
    const dashOffset = circumference * (1 - ratingPercentage);

    return (
      <svg className={styles.ratingCircle} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r={radius} stroke="#204529" strokeWidth="4" fill="none" />
        <circle
          cx="24"cy="24" r={radius} stroke={color} strokeWidth="4"
          fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset} transform="rotate(-90 24 24)"
        />
      </svg>
    );
  };

  return (
    <div className={styles.card} onClick={() => onClick(show)}>
      <div className={styles.imgContainer}>
        <img src={imageUrl} alt={show.title || show.name} className={styles.img} />
        <div className={styles.ratingBadge}>
          {createRatingCircle(rating)}
          <span className={styles.ratingText}>{rating}</span>
        </div>
      </div>
      <div className={styles.details}>
        <h3 className={styles.title}>{show.title || show.name}</h3>
        <div className={styles.dateHeart}>
          <p className={styles.date}>{formattedDate}</p>
          <button className={styles.heartButton} onClick={handleHeartClick}>
            {isInWishlist ? <FaHeart className={styles.heartFilled} /> : <FaRegHeart className={styles.heartOutline} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
