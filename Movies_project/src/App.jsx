import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import './APP.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <Home />
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
