import React, { useState, useEffect } from "react";  
import axios from "axios";  
import { MoreVertical } from "lucide-react";  
import { useNavigate, useLocation } from "react-router-dom";  
import MovieCard from "../Moviecard/MovieCard";  
import './Home.css';  

const API_KEY = "33faf8f966f0a01f5334e6ee43da19f8";  
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;  

const Home = () => {  
  const [movies, setMovies] = useState([]);  
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);  
  const [totalPages, setTotalPages] = useState(1);  
  const [searchTerm, setSearchTerm] = useState("");  
  const navigate = useNavigate();  
  const location = useLocation();  

  const searchParams = new URLSearchParams(location.search);  
  const currentPage = parseInt(searchParams.get("page") || "1", 10);  

  useEffect(() => {  
    const fetchNowPlaying = async () => {  
      try {  
        setLoading(true);  
        const response = await axios.get(API_URL + `&page=${currentPage}`);  
        setMovies(response.data.results);  
        setTotalPages(Math.min(response.data.total_pages, 500));  
      } catch (error) {  
        console.error("Error fetching movies:", error);  
        setError("Failed to fetch movies");  
      } finally {  
        setLoading(false);  
      }  
    };  

    fetchNowPlaying();  
  }, [currentPage]);  

  const handleSearchChange = (e) => {  
    setSearchTerm(e.target.value);  
  };  

  const handleSearchSubmit = (e) => {  
    e.preventDefault();  
    if (!searchTerm.trim()) return;  

    navigate(  
      `/search?query=${encodeURIComponent(searchTerm)}&page=1&type=movie`  
    );  
  };  

  const handlePageChange = (newPage) => {  
    navigate(`/?page=${newPage}`);  
  };  

  return (  
    <div className="home-container">  
      <div className="search">  
        <div className="search-content">  
          <h1 className="welcome">Welcome</h1>  
          <p className="explore-text">  
            Explore the latest movies now playing in cinemas.  
          </p>  
          <form onSubmit={handleSearchSubmit} className="search-form">  
            <input  
              type="text"  
              placeholder="Search for movies..."  
              value={searchTerm}  
              onChange={handleSearchChange}  
              className="search-input"  
            />  
            <button type="submit" className="search-button">  
              Search  
            </button>  
          </form>  
        </div>  
      </div>  

      <div className="movies-content">  
        <h2 className="now-playing">Now Playing..</h2>  

        {loading ? (  
          <div className="loading">Loading...</div>  
        ) : error ? (  
          <div className="error">{error}</div>  
        ) : (  
          <div className="movies-grid">  
            {movies.map((movie) => (  
              <MovieCard  
                key={movie.id}  
                id={movie.id}  
                posterPath={movie.poster_path}  
                title={movie.title}  
                releaseDate={movie.release_date}  
                rating={movie.vote_average}  
                type="movie"  
              />  
            ))}  
          </div>  
        )}  

        {!loading && movies.length > 0 && (  
          <div className="pagination">  
            <button  
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}  
              disabled={currentPage === 1}  
              className="pagination-button"  
            >  
              ‹  
            </button>  

            {[...Array(Math.min(5, totalPages))].map((_, idx) => {  
              const pageNum = idx + 1;  
              return (  
                <button  
                  key={pageNum}  
                  onClick={() => handlePageChange(pageNum)}  
                  className={`page-number ${currentPage === pageNum ? 'active' : ''}`}  
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
              onClick={() =>  
                handlePageChange(Math.min(totalPages, currentPage + 1))  
              }  
              disabled={currentPage === totalPages}  
              className="pagination-button"  
            >  
              ›  
            </button>  
          </div>  
        )}  
      </div>  
    </div>  
  );  
};  

export default Home;  