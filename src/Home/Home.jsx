import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist, removeWishlist } from "../store/slice/wishlistSlice";
import MovieCard from "../Moviecard/MovieCard";
import "./Home.css";

const API_KEY = "33faf8f966f0a01f5334e6ee43da19f8";

const translations = {
  en: {
    welcome: "Welcome",
    exploreText: "Explore the latest movies now playing in cinemas.",
    searchPlaceholder: "Search for movies...",
    searchButton: "Search",
    nowPlaying: "Now Playing..",
    loading: "Loading...",
    error: "Failed to fetch movies",
    addToWishlist: "Add ",
    removeFromWishlist: "Remove",
  },
  ar: {
    welcome: "مرحبًا",
    exploreText: "استكشف أحدث الأفلام التي يتم عرضها في السينما الآن.",
    searchPlaceholder: "ابحث عن أفلام...",
    searchButton: "بحث",
    nowPlaying: "يعرض الآن..",
    loading: "جارٍ التحميل...",
    error: "فشل في جلب الأفلام",
    addToWishlist: "إضافة إلى قائمة الرغبات",
    removeFromWishlist: "إزالة من قائمة الرغبات",
  },
  fr: {
    welcome: "Bienvenue",
    exploreText: "Découvrez les derniers films actuellement à l'affiche.",
    searchPlaceholder: "Rechercher des films...",
    searchButton: "Rechercher",
    nowPlaying: "En salle..",
    loading: "Chargement...",
    error: "Échec de la récupération des films",
    addToWishlist: "Ajouter à la liste de souhaits",
    removeFromWishlist: "Retirer de la liste de souhaits",
  },
  zh: {
    welcome: "欢迎",
    exploreText: "探索影院中正在上映的最新电影。",
    searchPlaceholder: "搜索电影...",
    searchButton: "搜索",
    nowPlaying: "正在上映..",
    loading: "加载中...",
    error: "无法获取电影",
    addToWishlist: "添加到愿望清单",
    removeFromWishlist: "从愿望清单中移除",
  },
};

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.movies);
  const currentLang = useSelector((state) => state.language.currentLang);

  const t = translations[currentLang] || translations.en;
  const isRTL = currentLang === "ar";
  const direction = isRTL ? "rtl" : "ltr";

  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiLang =
          currentLang === "ar"
            ? "ar-SA"
            : currentLang === "fr"
            ? "fr-FR"
            : currentLang === "zh"
            ? "zh-CN"
            : "en-US";

        if (searchTerm.trim()) {
          const [movieRes, tvRes] = await Promise.all([
            axios.get(
              `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}&language=${apiLang}`
            ),
            axios.get(
              `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}&language=${apiLang}`
            ),
          ]);

          const movies = movieRes.data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            releaseDate: movie.release_date,
            rating: Math.round(movie.vote_average / 2),
            votes: movie.vote_count,
            description: movie.overview,
            posterPath: movie.poster_path,
            type: "movie",
            popularity: movie.popularity,
          }));

          const tvShows = tvRes.data.results.map((show) => ({
            id: show.id,
            title: show.name,
            releaseDate: show.first_air_date,
            rating: Math.round(show.vote_average / 2),
            votes: show.vote_count,
            description: show.overview,
            posterPath: show.poster_path,
            type: "tvShow",
            popularity: show.popularity,
          }));

          const combined = [...movies, ...tvShows].sort((a, b) => b.popularity - a.popularity);
          setMovies(combined);
        } else {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=${apiLang}&page=${currentPage}`
          );

          const mappedData = response.data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            releaseDate: movie.release_date,
            rating: Math.round(movie.vote_average / 2),
            votes: movie.vote_count,
            description: movie.overview,
            posterPath: movie.poster_path,
            type: "movie",
          }));

          setMovies(mappedData);
          setTotalPages(Math.min(response.data.total_pages, 500));
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, currentPage, currentLang]);

  const handleWishlistToggle = (movie) => {
    const exists = wishlist.find((item) => item.id === movie.id);
    if (exists) {
      dispatch(removeWishlist(movie));
    } else {
      dispatch(addWishlist(movie));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setSearchTerm(searchTerm.trim());
  };

  const handlePageChange = (newPage) => {
    navigate(`/?page=${newPage}`);
  };

  return (
    <div className="home-container" dir={direction}>
      <div className="search">
        <div className="search-content">
          <h1 className="welcome">{t.welcome}</h1>
          <p className="explore-text">{t.exploreText}</p>
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button type="submit" className="search-button">
              {t.searchButton}
            </button>
          </form>
        </div>
      </div>

      <div className="movies-content">
        <h2 className="now-playing">{t.nowPlaying}</h2>

        {loading ? (
          <div className="loading">{t.loading}</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                posterPath={movie.posterPath}
                title={movie.title}
                releaseDate={movie.releaseDate}
                rating={movie.rating}
                type={movie.type}
                wishlist={wishlist}
                handleWishlistToggle={() => handleWishlistToggle(movie)}
                translations={t}
                description={movie.description}
                votes={movie.votes}
              />
            ))}
          </div>
        )}

        {!loading && !searchTerm && movies.length > 0 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              {isRTL ? "›" : "‹"}
            </button>

            {[...Array(Math.min(5, totalPages))].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`page-number ${currentPage === pageNum ? "active" : ""}`}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && (
              <>
                <span className="ellipsis">...</span>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="page-number"
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              {isRTL ? "‹" : "›"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
