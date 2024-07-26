import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>
        <Link to={`/`}>Dashboard</Link>
      </h2>
      <ul>
        <li>
          <Link to={`/gastos`}>Gastos</Link>
        </li>
        <li>
          <Link to={`/investimentos`}>Investimentos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
