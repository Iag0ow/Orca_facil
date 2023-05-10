import React from "react";
import { useState, useEffect } from "react";
import Aside from "../../components/Aside/Aside";
import "./Home.css";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
const Home = (handleFunc) => {
  return (
    <>
      <NavBar value={handleFunc} />
      <div className="d-flex">
        <div className="container">
          <h1 className="text-center display-1 mt-5">Criar Orçamento</h1>
          <div className="row mt-5">
            <div className="col-md-4">
              <Link to={`hidraulica/HYDRAULICS`}>
                <div className="category hidraulica"></div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to={`eletrica/ELECTRICAL`}>
                <div className="category eletrica"></div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to={`fundacao/STRUCTURAL`}>
                <div className="category fundacao"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
