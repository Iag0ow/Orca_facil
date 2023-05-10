import React from "react";
import "./NavBar.css";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
const NavBar = () => {
  const logOut = (handleFunc) => {
    localStorage.removeItem("token");
    handleFunc(false);
    setcredentials(true);
  };
  const [credentials, setcredentials] = useState(false);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <Link onClick={logOut} className="nav-link">
                  Sair
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {credentials && <Navigate to="/login" />}
    </>
  );
};

export default NavBar;
