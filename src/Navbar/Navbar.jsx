import "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";

import { updateCurrentLang } from "../store/slice/language";

import { Link, useNavigate } from "react-router-dom"; 

const Navbar = () => {
  const { currentLang, availableLangs } = useSelector(
    (state) => state.language
  );

  const wishlist = useSelector((state) => state.wishlist.movies);
  const wishlistCount = wishlist.length;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLanguageChange = (lang) => {
    dispatch(updateCurrentLang(lang));
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg container fixed-top">
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
                <span className="nav-link active" aria-current="page" >
                  Movie APP
                </span>
              </li>
              <li className="nav-item" style={{ marginLeft: "650px" }}>
                <Link className="nav-link" to="/">
                  Movies
                </Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/tv">
               TV shows
               </Link>
              </li>
             

              <li className="nav-item dropdown">
                <button
                  className="btn btn-outline dropdown-toggle nav-link"
                  type="button"
                  data-bs-toggle="dropdown"
                  style={{ color: "black", borderColor: "white" }}
                >
                  {currentLang.toUpperCase()}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {availableLangs.map((lang) => (
                    <li key={lang}>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLanguageChange(lang)}
                      >
                        {lang.toUpperCase()}
                      </button>
                    </li>
                  ))}
                </ul>
                 
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/wishlist">
                  <i
                    className={`bi bi-heart-fill ${
                      wishlistCount > 0 ? "filled" : ""
                    }`}
                    style={{ marginRight: "2px" }}
                  ></i>
                  wishlist {wishlistCount}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;




