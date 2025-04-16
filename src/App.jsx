import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import "./App.css";
import Details from "./pages/Details/Details";
import Navbars from "./Components/nav/Nav";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbars />
      <Routes>
        <Route path="/tv" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
