import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../store/slices/languageSlice";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaSearch } from "react-icons/fa"; 
import "../styles/global.css";

const NavbarComponent = () => {
  // Search Logic
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  // Language Logic
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.languages);

  const handleLanguageChange = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <Navbar expand="lg" className="custom-navbar" >
      <Container fluid>
        <Navbar.Brand  >
          <Link Link to="/" className="navbar-brand">
              MovieApp
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Link Link to="/movie" className="nav-link">
              Home
            </Link>
            <Link Link to="/movie" className="nav-link">
              Movies
            </Link>
            <Link Link to="/tv" className="nav-link">
              TV Shows
            </Link>
          </Nav>
          <Form onSubmit={handleSearch} className="search-form">
            <div className="search-container">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie ..."
                className="search-input"
              />
              <FaSearch className="search-icon" onClick={handleSearch} />
            </div>
          </Form>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="language-select"
          >
            {["en", "ar", "fr", "zh"].map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;








