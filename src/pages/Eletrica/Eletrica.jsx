import React from "react";
import { useState, useEffect } from "react";
import "./Eletrica.css";
import { useParams } from "react-router-dom";
import { getProduct, getProducts, updateProduct } from "../../../utils/Config";
import Menus from "../../components/Menus/Menus";
import NavBar from "../../components/NavBar/NavBar";
const Eletrica = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [updated, setUpdated] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setProducts(await getProducts("ELECTRICAL"));
      setLoading(false);
    }
    fetchData();
  }, [updated]);

  const editItens = async (id) => {
    const values = await getProduct(id);
    setName(values.name);
    setPrice(values.price);
    setBrand(values.brand);
    setId(id);
  };
  const updateProducts = async (e) => {
    e.preventDefault();
    const updateBody = {
      name,
      price,
      brand,
    };
    const updated = await updateProduct(id, updateBody);
    setUpdated(updated.name);
    document.getElementById("closedButton2").click();
  };
  return (
    <>
      <NavBar />
      <div className="container mt-5 p-4 bg-white">
        <div className=" table-itens">
          <h1 className="text-center title-orc">Produtos Elétricos</h1>
          <div className="table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table table-hover">
              <thead>
                <tr className="table-color">
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Marca</th>
                  <th id="actions">Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4">
                      <div className="d-flex justify-content-center align-items-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {products &&
                      products.map((product, index) => (
                        <tr key={index}>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.brand}</td>
                          <td>
                            <div
                              onClick={() => editItens(product._id)}
                              className="pointer"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal5"
                              data-bs-whatever="@mdo"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-pencil-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                              </svg>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Menus category={category} setProducts={setProducts} />
      </div>
      {/* modal section */}

      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-center"
                id="exampleModalLabel"
              >
                Atualizar item
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={updateProducts}>
                <div className="mb-3">
                  <label className="col-form-label">Nome*</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Preço*</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Marca*</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    onChange={(e) => setBrand(e.target.value)}
                    value={brand}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    id="closedButton2"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Fechar
                  </button>
                  <button
                    type="Submit"
                    //data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <Link type="button" className="btn btn-success" to="/cadastrar/produto">
        Criar orçamento
      </Link> */}
    </>
  );
};

export default Eletrica;
