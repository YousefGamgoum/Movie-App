import React, { useEffect, useState } from "react";
import MovieCard from "../Moviecard/MovieCard"; 
import styles from "./ShowTV.module.css";
import { useNavigate } from "react-router-dom";
import '../Home/Home.css';

const API_KEY = "33faf8f966f0a01f5334e6ee43da19f8";

function ShowTV() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchShows = async (page = 1) => {
    try {
      setLoading(true);
      setError(null); 
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}`
      );
      if (!response.ok) throw new Error("Failed to fetch shows");

      const data = await response.json();
      setShows(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchShows(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const ShowTvShowDetails = (id) => {
    navigate(`/tv/${id}`);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        Error: {error}{" "}
        <button onClick={() => fetchShows(currentPage)}>Retry</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.Title}>TV Show</h1>

      {shows.length === 0 ? (
        <div className={styles.emptyState}>No TV shows available.</div>
      ) : (
        <div className={styles.tvGrid}>
          {shows.map((show) => (
            <MovieCard
              key={show.id}
              id={show.id}
              posterPath={show.poster_path}
              title={show.name} 
              releaseDate={show.first_air_date} 
              rating={Math.round(show.vote_average / 2)} 
              type="tv"
              description={show.overview}
              votes={show.vote_count}
              onClick={() => ShowTvShowDetails(show.id)}
            />
          ))}
        </div>
      )}

{!loading && shows.length > 0 && (
  <div className="pagination">
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="pagination-button"
    >
      {"<"}
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
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="pagination-button"
    >
      {">"}
    </button>
  </div>
)}

    </div>
  );
}

export default ShowTV;



