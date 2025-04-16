import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import { updateCurrentLang } from "../store/slice/language";
// import { addWishlist, removeWishlist } from '../store/slice/cartSlice'
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentLang, availableLangs } = useSelector((state) => state.language);
  const wishlist = useSelector((state) => state.wishlist.movies);
  const wishlistCount = wishlist.length;

  const handleLanguageChange = (lang) => {
    dispatch(updateCurrentLang(lang));
    navigate("/"); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-warning bg-warning">
      <div className="container">
        <p className="navbar-brand" to="/">MyStore</p>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* menue */}

    <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* AR/EN*/}
            <li className="nav-item dropdown">
              <button className="btn btn-outline dropdown-toggle nav-link" 
                      type="button" 
                      data-bs-toggle="dropdown"
                      style={{color: 'black', borderColor: 'white'}}>
                {currentLang.toUpperCase()}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {availableLangs.map((lang) => (
                  <li key={lang}>
                    <button className="dropdown-item" onClick={() => handleLanguageChange(lang)}>
                      {lang.toUpperCase()}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
            
            {/* WISHLIST*/}
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">
                <i className={`fa-solid fa-heart ${wishlistCount > 0 ? 'filled' : ''}`}></i> watchlist  {wishlistCount}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};



export default Navbar;
