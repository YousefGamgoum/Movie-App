import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../../Apis/config";
import styles from "./Details.module.css";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
/>;
import "@fortawesome/fontawesome-free/css/all.min.css";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
/>;

export default function Details({ id }) {
  const navigate = useNavigate();
  const [detailed, setDetailed] = useState([]);
  const [imageUrl, setimageUrl] = useState("");
  useEffect(() => {
    axiosInstance
      .get(`/tv/45789?api_key=33faf8f966f0a01f5334e6ee43da19f8`)
      .then((res) => {
        setDetailed(res.data);
        setimageUrl(`https://image.tmdb.org/t/p/w500${res.data.poster_path}`);
        console.log(res.data.poster_path);
      })
      .catch((err) => {
        navigate("/notfound");
        console.log(err);
      })
      .finally(() => {});
  }, []);

  return (
    <>
      <div className="container" id={styles.detaildContainer}>
        <img src={imageUrl} id={styles.detailedImage} />
        <div id={styles.detailedDetail}>
          <h2 className="fw-bolder">{detailed.name}</h2>
          <p className="lead">{detailed.first_air_date}</p>
          <div className={styles.ratess}>
            {[...Array(5)].map((_, index) => (
              <i
                key={index}
                className={`${
                  index * 2 < detailed.vote_average
                    ? "fas fa-star"
                    : "far fa-star"
                } ${styles.starr}`}
              ></i>
            ))}
            <span className={styles.votess}>{detailed.vote_count}</span>
          </div>
          <p id={styles.detailPara} className="mt-5">
            {detailed.overview}
          </p>
          <h5>
            <span class="badge rounded-pill bg-warning text-dark">
              {detailed.type}
            </span>
          </h5>

          <div className="d-flex justify-content-between w-50 mt-4">
            <p className="fs-5">
              <strong className="fw-bold fe-5">Seasons: </strong>{" "}
              {detailed.number_of_seasons}
            </p>
            <p className="fs-5">
              <strong className="fw-bold fe-5">Episodes: </strong>{" "}
              {detailed.number_of_episodes}
            </p>
            <p className="fs-5 ">
              <strong className="fw-bold fe-5">Country: </strong>{" "}
              {detailed.origin_country}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
