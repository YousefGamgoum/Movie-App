import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addWishlist,
  removeWishlist,
} from "../../src/store/slice/wishlistSlice";
import styles from "./whishList.module.css";

const WhishList = () => {
  const wishlist = useSelector((state) => state.wishlist.movies);
  const currentLang = useSelector((state) => state.language.currentLang);
  const dispatch = useDispatch();

  const translations = {
    en: {
      title: "Watch list",
      emptyText: "No Movies in watch list",
      backButton: "Back to home",
      unknownDate: "Unknown Date",
      noDescription: "No description available",
      notAvailable: "Not Available",
    },
    ar: {
      title: "قائمة المشاهدة",
      emptyText: "لا توجد أفلام في قائمة المشاهدة",
      backButton: "العودة إلى الصفحة الرئيسية",
      unknownDate: "تاريخ غير معروف",
      noDescription: "لا يوجد وصف متاح",
      notAvailable: "غير متاح",
    },
    fr: {
      title: "Liste de suivi",
      emptyText: "Aucun film dans la liste de suivi",
      backButton: "Retour à l'accueil",
      unknownDate: "Date inconnue",
      noDescription: "Aucune description disponible",
      notAvailable: "Non disponible",
    },
    zh: {
      title: "观看列表",
      emptyText: "观看列表中没有电影",
      backButton: "返回首页",
      unknownDate: "未知日期",
      noDescription: "没有描述可用",
      notAvailable: "不可用",
    },
  };

  const t = translations[currentLang] || translations.en;
  const isRTL = currentLang === "ar";
  const direction = isRTL ? "rtl" : "ltr";

  const handleToggleWishlist = (movie) => {
    const isfindWishlist = wishlist.some((item) => item.id === movie.id);
    dispatch(isfindWishlist ? removeWishlist(movie) : addWishlist(movie));
  };

  console.log("Wishlist data:", wishlist);

  return (
    <div className={styles.container} dir={direction}>
      <h2 className={styles.title}>{t.title}</h2>
      {wishlist.length === 0 ? (
        <div className={styles.emptyState}>
          <i className={`fas fa-heart-broken ${styles.brokenHeart}`}></i>
          <h4 className={styles.emptyText}>{t.emptyText}</h4>
          <Link to="/">
            <button className={styles.backButton}>{t.backButton}</button>
          </Link>
        </div>
      ) : (
        <div className={styles.movieGrid}>
          {wishlist.map((movie) => {
            const isfindWishlist = wishlist.find(
              (item) => item.id === movie.id
            );

            return (
              <div key={movie.id} className={styles.movieCard}>
                <div className={styles.posterWrapper}>
                  <img
                    src={
                      movie.poster ||
                      "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                    }
                    className={styles.poster}
                    alt={movie.title || "Movie"}
                  />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.titleRow}>
                    <h5 className={styles.movieTitle}>
                      {movie.title || "Untitled"}
                    </h5>
                    <i
                      className={`fas fa-heart ${styles.heartIcon} ${
                        isfindWishlist ? styles.heartFilled : ""
                      }`}
                      onClick={() => handleToggleWishlist(movie)}
                    ></i>
                  </div>
                  <p className={styles.movieDate}>
                    {movie.date || t.unknownDate}
                  </p>
                  <div className={styles.rating}>
                    {[...Array(5)].map((_, index) => (
                      <i
                        key={index}
                        className={`${
                          index < (movie.rating || 0)
                            ? "fas fa-star"
                            : "far fa-star"
                        } ${styles.star}`}
                      ></i>
                    ))}
                    {movie.votes > 0 && (
                      <span className={styles.votes}>{movie.votes}</span>
                    )}
                  </div>
                  <p className={styles.description}>
                    {(movie.description || t.noDescription).slice(0, 100)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WhishList;
