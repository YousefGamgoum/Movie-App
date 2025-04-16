import { useState } from 'react'
import Navbar from './component/navbar';
// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import WhishList from './pages/whish-list/whishList'
import Home from '../src/pages/home';
import NotFound from './pages/Not-Found/notfound';



function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Navbar/>
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<WhishList />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </div>
  </Router>
  )
}

export default App
