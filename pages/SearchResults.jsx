import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import "../styles/global.css";
import { useSelector } from "react-redux";
const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);
  const { language } = useSelector((state) => state.languages);
  const apiKey = "e0dd7fb1ec73d693e8c236644b38dc1f";

  useEffect(() => {
        const fetchSearchResults = async () => {
          try {
            // fetch movies with language
            const movieResult = await axios.get(
              `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=${language}`
            );
            // fetch tvShows with language
            const tvResult = await axios.get(
              `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=${language}`
            );
            //  Adding key media_type to movieResult and tvResult to differnate between them while searching
            const transformMovies = movieResult.data.results.map((movie) => ({
              ...movie,
              media_type: "movie",
            }));
            const transformTvShows = tvResult.data.results.map((show) => ({
              ...show,
              title: show.name, 
              media_type: "tvShow",
            }));
            // Combining movieResult and tvResult and sorting them by release date
            const List_Of_Movies_TvShows = [...transformMovies, ...transformTvShows].sort(
              (a, b) => b.popularity - a.popularity
            );

            setResults(List_Of_Movies_TvShows);
          } catch (error) {
            console.error("Error fetching search results:", error);
          }
        };
        if (query) fetchSearchResults();
   },[query,language]);


  return (
    <div className="wraper-container">
      <h2>Search Results for "{query}"</h2>
      {results.length === 0 ? (
        <p className="no-results">No results found</p>
      ) : (
        <div className="wraper-grid">
          {results.map((item) => (
            <div key={`${item.media_type}-${item.id}`} className="wraper-card">
              <img
                src={
                  `https://image.tmdb.org/t/p/w300${item.poster_path}`
                }
                alt={item.title}
                className="wraper-poster"
              />
              <div className="wraper-info">
                <h3>{item.title}</h3>
                <span className="media-type">
                  {item.media_type === "movie" ? "Movie" : "TV Show"}
                </span>
                <p>{item.overview ? item.overview.slice(0, 100) + "..." : "No description available"}</p>
                <span className="wraper-rating">
                  ⭐ {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}/10
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;