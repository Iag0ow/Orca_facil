import React from "react";
import "./NavBar.css";
import { useState, useEffect } from "react";
import logo from "../../image/orcafacil-side.png";
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
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
            <img src={logo} alt="" />
          </Link>
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
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/hidraulica/HIDRAULICS">
                  Hidráulica
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/eletrica/ELECTRICAL">
                  Elétrica
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/fundacao/STRUCTURAL">
                  Estruturação
                </Link>
              </li>
              <li className="nav-item ">
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
