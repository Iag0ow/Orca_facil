import React from "react";
import "./Orcamento.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBudgetById, getBudgets, getProduct, getProductsByBudgets, getProductsByCategory, updateProduct } from "../../../utils/Config";
import Menus from "../../components/Menus/Menus";
import NavBar from "../../components/NavBar/NavBar";
const Orcamento = () => {
  const { category } = useParams();
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [itemId, setItemId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [updated, setUpdated] = useState("");


  const [productsByBudget, setProductsByBudget] = useState([]);

  const [budgets, setBudgets] = useState([]);
  const [budgetData, setBudgetData] = useState("")
  const [selectedBudgetId, setSelectedBudgetId] = useState(id);


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
  }
  
  
  useEffect(() => {
    async function fetchData() {
      setProductsByBudget(await getProductsByBudgets(selectedBudgetId));
    }
    console.log(productsByBudget);
    fetchData();
  }, [selectedBudgetId]);


    // useEffect(() => {
    //   async function fetchData() {
    //    selectedBudgetId(await getBudgetById(selectedBudgetId));
    //   }
    //   fetchData();
    // }, []);
  const editItens = async (id) => {
    const values = await getProduct(id);
    setName(values.name);
    setPrice(values.price);
    setBrand(values.brand);
    setItemId(id);
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
    document.getElementById("closedButton5").click();
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
              <option disabled value="">
                Selecione
              </option>
              {budgets.map((budget) => (
                <option value={budget._id} key={budget._id}>
                  {budget.name}
                </option>
              ))}
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
        <div className=" table-itens">
          <div className="table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table table-hover">
              <thead>
                <tr className="table-color">
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th id="actions">Check</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lampada led bulbo, luz branca fria, 4.5w - bivolt </td>
                  <td> R$ 16,10 </td>
                  <td>6 </td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td>Conjunto tomada branca 20a 250v </td>
                  <td>R$ 14,10</td>
                  <td>8</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                    </svg>{" "}
                  </td>
                </tr>
                <tr>
                  <td>Caixa de luz 4x2 amarela </td>
                  <td> R$ 3,98</td>
                  <td>4</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td>Interruptor paralelo branco 10a 250v</td>
                  <td>R$ 9,00</td>
                  <td>5 </td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                    </svg>{" "}
                  </td>
                </tr>
                {/* {products &&
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
                          <input type="checkbox" name="" id="" />
                        </div>
                      </td>
                    </tr>
                  ))} */}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <select
              defaultValue=""
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              onChange={handleChange}
            >
              <option disabled value="">
                Selecione
              </option>
              {productsByBudget &&
                productsByBudget.map((product) => (
                  <option
                    value={product.productId._id}
                    key={product.productId._id}
                  >
                    {product.productId.name}
                  </option>
                ))}
            </select>
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
