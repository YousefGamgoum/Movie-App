import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import NavbarComponent from "./components/Navbar";
import MovieList from "./pages/MovieList";
import SearchResults from "./pages/SearchResults";
import TvShowsComponent from './pages/TvList'
function App() {
  const { language } = useSelector((state) => state.languages);
  const direction = language === "ar" ? "rtl" : "ltr";

  return (
    <div className={direction === "rtl" ? "rtl" : "ltr"}>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/search" element={<SearchResults />} /> 
          <Route path="/movie" element={<MovieList/>} />
          <Route path="/tv" element={<TvShowsComponent />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;