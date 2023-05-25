import React from "react";
import Swal from "sweetalert2";
import "./OrcamentoEdit.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
  getBudgetsBySellerId,
  getBudgetInfoById,
  getPDF,
} from "../../../utils/Config";
import Menus from "../../components/Menus/Menus";
import NavBar from "../../components/NavBar/NavBar";
const OrcamentoEdit = () => {
  const { id } = useParams();
  const { idBudget } = useParams();

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
  const [budgetInfo, setBudgetInfo] = useState("");

  const [productsByBudget, setProductsByBudget] = useState([]);

  const [budgets, setBudgets] = useState(null);
  const [budgetData, setBudgetData] = useState("");
  const [selectedBudgetId, setSelectedBudgetId] = useState(idBudget);

  const [statusAlter, setStatusAlter] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchData() {
    const result = await getBudgetById(selectedBudgetId);
    setBudgetData(result);
    category(result.category.key);
    getBudgetInfo(result._id);
  }
  fetchData();
}, [selectedBudgetId, productDeleted, productsByBudget]);


  
  const category = async (category) => {
    setProducts(await getProductsByCategory(category));
  }
    const getBudgetInfo = async (id) => {
      setBudgetInfo(await getBudgetInfoById(id));
    };
//   useEffect(() => {
//       async function fetchData() {
//         setSelectedBudgetId(id)
//       );
//     }
//     fetchData();
//   }, [updated]);
  useEffect(() => {
    async function fetchData() {
      setBudgets(await getBudgetsBySellerId(id));
    }
    fetchData();
  }, [selectedBudgetId]);
    


  const handleChange = (e) => {
      setSelectedBudgetId(e.target.value);
  };

    useEffect(() => {
      async function fetchData() {
        setProductsByBudget(await getProductsByBudgets(selectedBudgetId));
      setLoading(false);
      }
      fetchData();
    }, [statusAlter, quantity, selectedBudgetId, productDeleted, productEdited]);

  //   useEffect(() => {
  //       async function fetchData() {
  //         console.log('teste', budgets[0].category.key);
  //       setProducts(await getProducts(budgets[0].category.key));
  //     }
  //     fetchData();
  //   }, [selectedBudgetId]);
  const handleSetProducts = async (e) => {
    const obj = {
      budgetId: selectedBudgetId,
      productId: e.target.value,
      quantity: 1,
    };
    const result = await setProductsInBudgets(obj);
    if (result.statusCode == 400) {
      setError(result.message);
    } else {
      setStatusAlter(statusAlter + 1);
      setError("");
    }
  };

  const handleDelete = async (product) => {
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success ms-3",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

swalWithBootstrapButtons
  .fire({
    title: "Deseja realmente excluir este produto?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim, excluir!",
    cancelButtonText: "Não, cancelar!",
    reverseButtons: true,
  })
  .then( async(result) => {
    if (result.isConfirmed) {
      setProductDeleted(await deleteProductBudgetById(product));
      setError("");
      setStatusAlter(0);
      clearInput();
      swalWithBootstrapButtons.fire(
        "Produto deletado com sucesso!",
      );
    }
  });

  };
  const editItens = async (id, qnt) => {
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
  const handlePDF = async () => {
    const pdfWindow = window.open();
    const result = await getPDF(budgetData._id);
    window.location.href = result.html;
    pdfWindow.document.write(result.html);
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
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
              {loading ? (
                <option>Carregando...</option>
              ) : (
                budgets &&
                budgets.map((budgett) => (
                  <option value={budgett._id} key={budgett._id}>
                    {budgett.name}
                  </option>
                ))
              )}
            </select>

            <div className="col-md-9"></div>
          </div>
          <div className="col-md-3">
            {loading ? (
              <input
                type="text"
                className="form-control mt-2"
                value="Vendedor: Carregando..."
                aria-label="Username"
                disabled
              ></input>
            ) : (
              <input
                type="text"
                className="form-control mt-2"
                value={`Vendedor: ${budgetData && budgetData.sellerId.name}`}
                aria-label="Username"
                disabled
              ></input>
            )}
          </div>
          <div className="col-md-4">
            {loading ? (
              <input
                type="text"
                className="form-control mt-2"
                value="Cliente: Carregando..."
                aria-label="Username"
                disabled
              ></input>
            ) : (
              <input
                type="text"
                className="form-control mt-2"
                value={`Cliente: ${budgetData && budgetData.customerId.name}`}
                aria-label="Username"
                disabled
              ></input>
            )}
          </div>
          <div className="col-md-2">
            {loading ? (
              <input
                type="text"
                className="form-control mt-2"
                value="Carregando..."
                aria-label="Username"
                disabled
              ></input>
            ) : (
              <input
                type="text"
                className="form-control mt-2"
                value={budgetData && budgetData.category.label}
                aria-label="Username"
                disabled
              ></input>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">
            {loading ? (
              <input
                type="text"
                className="form-control mt-2"
                value="Valor do orçamento: Carregando..."
                aria-label="Username"
                disabled
              ></input>
            ) : (
              <input
                type="text"
                className="form-control mt-2"
                value={`Valor do orçamento: R$ ${
                  budgetInfo && budgetInfo.totalAmount
                }`}
                aria-label="Username"
                disabled
              ></input>
            )}
          </div>
          <div className="col-md-3">
            {loading ? (
              <input
                type="text"
                className="form-control mt-2"
                value="Quantidade de produtos: Carregando... "
                aria-label="Username"
                disabled
              ></input>
            ) : (
              <input
                type="text"
                className="form-control mt-2"
                value={`Quantidade de produtos: ${
                  budgetInfo && budgetInfo.totalQuantity
                } und`}
                aria-label="Username"
                disabled
              ></input>
            )}
          </div>
          <div className="col-md-3">
            {loading ? (
              <input
                type="text"
                className="form-control mt-2"
                value="Items: Carregando..."
                aria-label="Username"
                disabled
              ></input>
            ) : (
              <input
                type="text"
                className="form-control mt-2"
                value={`Items: ${budgetInfo && budgetInfo.count} und`}
                aria-label="Username"
                disabled
              ></input>
            )}
          </div>
        </div>
        <div className="row mt-4">
          <div className="d-flex justify-content-between">
            <div className="col-md-3">
              {/* <button
                type="button"
                className="btn btn-primary mb-2"
                id="closedButton"
              >
                Editar dados do orçamento
              </button> */}
            </div>
            <div>
              <button
                type="button"
                className="btn btn-warning mb-2"
                id="closedButton"
                onClick={handlePDF}
              >
                Gerar PDF
              </button>
            </div>
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
                {loading ? (
                  <tr>
                    <td colSpan="5">
                      <div className="d-flex justify-content-center align-items-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {productsByBudget &&
                      productsByBudget.map((product, index) => (
                        <tr key={index}>
                          <td>
                            {capitalizeFirstLetter(product.productId.name)}
                          </td>
                          <td>
                            R$ {product.productId.price.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                          <td>
                            {capitalizeFirstLetter(product.productId.brand)}
                          </td>
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
                              <span
                                className="pointer"
                                onClick={(e) => {
                                  handleEdit(e);
                                }}
                              >
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
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <Link to="/orcamentos" className="btn btn-danger">
            Voltar
          </Link>
        </div>
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

export default OrcamentoEdit;
