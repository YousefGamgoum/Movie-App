import "./APP.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import WhishList from "./whish-list/whishlist";
import ShowTV from "./tv show/ShowTV";
import Details from "./Details/Details";
import MovieDetails from "./MovieDetails/MovieDetails";
import { BrowserRouter as Router, Routes, Route, Form } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<WhishList />} />
          <Route path="/tv" element={<ShowTV/>} />
          <Route path="/tv/:id" element={<Details />}/>
          <Route path="/movie/:id" element={<MovieDetails />}/>
        
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
