import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import '../styles/global.css';
const apiKey = "e0dd7fb1ec73d693e8c236644b38dc1f";

const TvShowsComponent = () => {
  const [tvShows, setTvShows] = useState([]);
  const { language } = useSelector((state) => state.languages); 

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=${language}`
        );
        setTvShows(res.data.results);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      }
    };
    fetchTvShows();
  }, [language]);
  return (
    <div className="wraper-container">
      <h2>TV Shows</h2>
      <div className="wraper-grid">
        {tvShows.length > 0 ? (
          tvShows.map((show) => (
            <div key={show.id} className="wraper-card">
              <img
                src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                alt={show.name}
                className="wraper-poster"
              />
              <div className="wraper-info">
                <h4>{show.title}</h4>
                <h3>{show.name}</h3>
                <p>{show.overview.slice(0, 100)}...</p>
                <span className="wraper-rating">
                  ⭐ {show.vote_average.toFixed(1)}/10
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>Loading TV Shows...</p>
        )}
      </div>
    </div>
  );
};

export default TvShowsComponent;