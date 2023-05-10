import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, setProduct } from "../../../utils/Config";
const Menus = ({ category, setProducts }) => {
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const objRegister = {
      name,
      price: Number(price),
      brand,
      category,
    };
    const result = await setProduct(objRegister);

    // if (!result.statusCode == 400) {
    setProducts((prevStatus) => [...prevStatus, objRegister]);
    setName("");
    setPrice("");
    setBrand("");
    // }
    // } else {
    //   setStatus(true);
    //   setError(result.message);
    //   console.log();
    // }
  };
  const clear = () => {
    setError("");
    setName("");
    setPrice("");
    setBrand("");
  };
  return (
    <>
      <div className="d-flex"></div>
      <button
        type="button"
        className="btn btn-primary me-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
      >
        Cadastrar
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Cadastre seu produto
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {error && <h5 className="text-danger text-center">{error}</h5>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="col-form-label">Nome*</label>
                  <input
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    className="form-control"
                    id="recipient-name"
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Preço*</label>
                  <input
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    type="text"
                    className="form-control"
                    id="recipient-name"
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Marca*</label>
                  <input
                    required
                    onChange={(e) => setBrand(e.target.value)}
                    value={brand}
                    type="text"
                    className="form-control"
                    id="recipient-name"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={clear}
                  >
                    Fechar
                  </button>
                  {status == true ? (
                    <button
                      type="Submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Enviar
                    </button>
                  ) : (
                    <button
                      type="Submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Enviar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Link type="button" className="btn btn-success" to="/cadastrar/produto">
        Criar orça Flinston
      </Link>
      <div className="d-flex justify-content-end">
        <Link to="/" type="button" className="btn btn-danger">
          Voltar
        </Link>
      </div>
    </>
  );
};

export default Menus;
