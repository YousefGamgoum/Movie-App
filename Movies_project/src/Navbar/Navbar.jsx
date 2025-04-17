import "./Navbar.css";
import { useState } from "react";
import React from "react";

const Navbar = () => {
  const [language, setLanguage] = useState("En");

  const changeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg container">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Movie APP
                </a>
              </li>
              <li className="nav-item" style={{ marginLeft: "650px" }}>
                <a className="nav-link" href="#">
                  Movies
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  TV shows
                </a>
              </li>
              <li className="nav-link">
                <select value={language} onChange={changeLanguage}>
                  <option value="En">English</option>
                  <option value="Ar">Arabic</option>
                </select>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                <i class="bi bi-heart-fill" style={{marginRight:'2px'}}></i>
                  Wish List
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
