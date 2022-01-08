import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={Home}></Route>
        <Route path="/about" element={About}></Route>
      </Routes>
    </Router>
  );
}

export default App;
