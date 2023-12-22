import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ForexApp from "./components/ForexApp";

function App() {
  return (
    <Router>
      <div className="bg-gray-800 ">
        <nav className="flex items-center   text-white">
        <Link className="navbar-brand p-3 " to="/home">
            React_Basic
          </Link>
          <div className="flex items-center space-x-4">
          <ul className="flex items-center space-x-4">
            <li>
              <NavLink to="/" className="text-lg font-bold" activeClassName="text-white">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="text-lg font-bold" activeClassName="text-white">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/forex" className="text-lg font-bold" activeClassName="text-white">
                ForexApp
              </NavLink>
            </li>
          </ul>
          </div>
        </nav>

        
        <div className="mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/forex" element={<ForexApp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
