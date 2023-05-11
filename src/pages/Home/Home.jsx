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
      <div className="d-flex bottom-margin">
        <div className="container">
          <h1 className="text-center mt-5 title-orc">CATEGORIAS</h1>
          <div className="row mt-5">
            <div className="col-md-4">
              <Link to={`hidraulica/HYDRAULICS`}>
                <div className="category hidraulica"></div>
              </Link>
              <h1 className="text-center categories mt-3">Hidráulica</h1>
            </div>
            <div className="col-md-4">
              <Link to={`eletrica/ELECTRICAL`}>
                <div className="category eletrica"></div>
              </Link>
              <h1 className="text-center categories mt-3">Elétrica</h1>
            </div>
            <div className="col-md-4">
              <Link to={`fundacao/STRUCTURAL`}>
                <div className="category fundacao"></div>
              </Link>
              <h1 className="text-center categories mt-3">Fundação</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
