import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import Pagination from "../page/Pagination";
import styles from "./ShowTV.module.css";
import Nav from "../nav/Nav";

const API_KEY = "33faf8f966f0a01f5334e6ee43da19f8";

function ShowTV({ onSelectShow }) {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchShows = async (page = 1) => {
    try {
      setLoading(true);
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

  useEffect(() => {
    fetchShows(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      <Nav />
      <h1 className={styles.Title}>TV Show</h1>

      <div className={styles.tvGrid}>
        {shows.map((show) => (
          <Card key={show.id} show={show} onClick={onSelectShow} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ShowTV;
