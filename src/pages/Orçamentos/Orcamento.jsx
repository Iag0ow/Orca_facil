import React from "react";
import "./Orcamento.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getBudgetById,
  getBudgets,
  getProduct,
  getProducts,
  getProductsByBudgets,
  getProductsByCategory,
  deleteProductBudgetById,
  setProductsInBudgets,
  updateProduct,
  editProductsBudgetById,
} from "../../../utils/Config";
import Menus from "../../components/Menus/Menus";
import NavBar from "../../components/NavBar/NavBar";
const Orcamento = () => {
  const { category } = useParams();
  const { id } = useParams();

  const [error, setError] = useState(null);

  const [products, setProducts] = useState([]);
  const [productsSelected, setProductsSelected] = useState([]);
  const [productDeleted, setProductDeleted] = useState("");
  const [productEdited, setProductEdited] = useState("");


  const [itemId, setItemId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [updated, setUpdated] = useState("");

  const [productsByBudget, setProductsByBudget] = useState([]);

  const [budgets, setBudgets] = useState([]);
  const [budgetData, setBudgetData] = useState("");
  const [selectedBudgetId, setSelectedBudgetId] = useState(id);


  const [statusAlter, setStatusAlter] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  // useEffect(() => {
  //     async function fetchData() {
  //       setSelectedBudgetId(id)
  //     setProducts(await getProductsByCategory(category));
  //   }
  //   fetchData();
  // }, [updated]);

  useEffect(() => {
    async function fetchData() {
      setBudgets(await getBudgets());
    }
    fetchData();
  }, [selectedBudgetId]);

  useEffect(() => {
    async function fetchData() {
      setBudgetData(await getBudgetById(selectedBudgetId));
    }
    fetchData();
  }, [selectedBudgetId]);

  const handleChange = (e) => {
    setSelectedBudgetId(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      setProductsByBudget(await getProductsByBudgets(selectedBudgetId));
    }
    fetchData();
  }, [statusAlter,quantity, selectedBudgetId, productDeleted, productEdited]);

  useEffect(() => {
    async function fetchData() {
      setProducts(await getProducts(category));
    }
    fetchData();
  }, [selectedBudgetId]);
  const handleSetProducts = async (e) => {
    const obj = {
      budgetId: selectedBudgetId,
      productId: e.target.value,
      quantity: 1
    };
    const result = await setProductsInBudgets(obj);
    if (result.statusCode == 400) {
      setError(result.message);
    } else {
      setStatusAlter(statusAlter + 1) 
      setError("");
    }
    
  };

  const handleDelete = async (product) => {
    setProductDeleted(await deleteProductBudgetById(product));
    setError("");
    setStatusAlter(0);
    clearInput();
  }
  const editItens = async (id,qnt) => {
    setProductEdited(await editProductsBudgetById(id, qnt));
  };
  const updateProducts = async (e) => {
    e.preventDefault();
    const updateBody = {
      name,
      price,
      brand,
    };
    const updated = await updateProduct(itemId, updateBody);
    setUpdated(updated.name);
    document.getElementById("closedButton").click();
  };
const clearInput = () => {
  const inputs = document.querySelectorAll(".quantity");
  const inputArray = [...inputs];
  inputArray.map((input) => (input.value = ""));
};
const handleEdit = (e) => {
  const inputElement = e.target.closest("span").previousElementSibling;
  inputElement.disabled = false;
  inputElement.focus();

  const handleInputBlur = async function () {
    inputElement.disabled = true;
    const obj = {
      quantity: parseInt(inputElement.value),
    };
    await editItens(inputElement.id, obj);
  };

  const handleInputKeyPress = function (event) {
    if (event.key === "Enter") {
      inputElement.blur();
    }
  };

  inputElement.addEventListener("blur", handleInputBlur);
  inputElement.addEventListener("keypress", handleInputKeyPress);
};


  return (
    <>
      <NavBar />
      <div className="container mt-5 p-4 bg-white">
        <div className="row">
          <div className="col-md-3">
            <select
              defaultValue=""
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              onChange={handleChange}
            >
              {budgets[0] && (
                <option value={budgets[0]._id} key={budgets[0]._id}>
                  {budgets[0].name}
                </option>
              )}
            </select>
            <div className="col-md-9"></div>
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control mt-2"
              value={`Vendedor: ${budgetData && budgetData.sellerId.name}`}
              aria-label="Username"
              disabled
            ></input>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control mt-2"
              value={`Cliente: ${budgetData && budgetData.customerId.name}`}
              aria-label="Username"
              disabled
            ></input>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control mt-2"
              value={budgetData && budgetData.category.label}
              aria-label="Username"
              disabled
            ></input>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12">
            <select
              defaultValue=""
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              onChange={handleSetProducts}
            >
              <option disabled value="">
                Selecione o produto
              </option>

              {products &&
                products.map((product) => (
                  <option value={product._id} key={product._id}>
                    {product.name}
                  </option>
                ))}
            </select>
          </div>
          {error && (
            <h4 className="col-md-12 text-center text-danger">{error}</h4>
          )}
        </div>
        <div className=" table-itens">
          <div className="table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table table-hover">
              <thead>
                <tr className="table-color">
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Marca</th>
                  <th>Quantidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {productsByBudget &&
                  productsByBudget.map((product, index) => (
                    <tr key={index}>
                      <td>{product.productId.name}</td>
                      <td>{product.productId.price}</td>
                      <td>{product.productId.brand}</td>
                      <td>
                        <div>
                          <input
                            disabled
                            id={product._id}
                            className="quantity me-3"
                            type="number"
                            placeholder={product.quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                          <span className="pointer" onClick={(e)=> {handleEdit(e)}}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pencil"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <div
                            id="exclude"
                            className="ms-2 me-2 pointer"
                            onClick={() => handleDelete(product._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <Menus category={category} setProducts={setProducts} />
      </div>
      {/* modal section */}

      <div
        className="modal fade"
        id="exampleModal5"
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
                    id="closedButton5"
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

export default Orcamento;
