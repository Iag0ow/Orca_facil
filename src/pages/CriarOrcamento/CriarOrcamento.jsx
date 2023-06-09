import React from "react";
import "./CriarOrcamento.css";
import NavBar from "../../components/NavBar/NavBar";
import { Link, Navigate } from "react-router-dom";
import {
  getCustomersByName,
  getUsersByName,
  setBudget,
} from "../../../utils/Config";
import { useState, useEffect } from "react";
const CriarOrcamento = () => {
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [budgetId, setBudgetId] = useState("")
  const [sellerId, setSellerId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [category, setCategory] = useState("");
  const [sendCategory, setSendCategory] = useState("");

  const [credentials, setCredentials] = useState(false);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setCustomers(await getCustomersByName());
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      setUsers(await getUsersByName());
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerId == "" && !sellerId == "") {
      const obj = {
        name,
        sellerId,
        customerId,
        category,
      };
      const retorno = await setBudget(JSON.stringify(obj));
      if (retorno.name) {
        setStatus(true)
        clear();
      }
      setBudgetId(retorno._id);
      setSendCategory(retorno.category.key);
      setCredentials(true);
    }
  };
  const clear = () => {
    setName("")
    setCustomerId("")
    setSellerId("")
    setCategory("")
  }
  return (
    <>
      <NavBar />
      <div id="booking" className="section">
        <div className="section-center">
          <div className="container">
            <div className="row">
              <div className="booking-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    {/* <div className="form-checkbox">
                      <label for="roundtrip">
                        <input type="radio" id="roundtrip" name="flight-type" />
                        <span></span>Roundtrip
                      </label>
                      <label for="one-way">
                        <input type="radio" id="one-way" name="flight-type" />
                        <span></span>One way
                      </label>
                      <label for="multi-city">
                        <input
                          type="radio"
                          id="multi-city"
                          name="flight-type"
                        />
                        <span></span>Multi-City
                      </label>
                    </div> */}
                  </div>
                  <div className="row">
                    {status && (
                      <h3 className="text-success text-center">
                        Orçamento cadastrado com sucesso!
                      </h3>
                    )}
                    <div className="col-md-12">
                      <div className="form-group">
                        <span className="form-label">Nome do Orçamento</span>
                        <input
                          className="form-control"
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          value={name}
                          placeholder="Exemplo orçamento 1..."
                        />
                      </div>
                    </div>
                    {/* <div className="col-md-6">
                      <div className="form-group">
                        <span className="form-label">Flyning to</span>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="City or airport"
                        />
                      </div>
                    </div> */}
                  </div>
                  <div className="row">
                    {/* <div className="col-md-3">
                      <div className="form-group">
                        <span className="form-label">Departing</span>
                        <input className="form-control" type="date" required />
                      </div>
                    </div> */}
                    {/* <div className="col-md-3">
                      <div className="form-group">
                        <span className="form-label">Returning</span>
                        <input className="form-control" type="date" required />
                      </div>
                    </div> */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <span className="form-label">Vendedor</span>
                        <select
                          defaultValue=""
                          className="form-control"
                          onChange={(e) => setSellerId(e.target.value)}
                        >
                          <option disabled value="">
                            Selecione
                          </option>
                          {users.map((user) => (
                            <option value={user._id} key={user._id}>
                              {user.name}
                            </option>
                          ))}
                        </select>
                        <span className="select-arrow"></span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <span className="form-label">Cliente</span>
                        <select
                          defaultValue=""
                          onChange={(e) => {
                            setCustomerId(e.target.value);
                          }}
                          className="form-control"
                        >
                          <option disabled value="">
                            Selecione
                          </option>
                          {customers.map((customer) => (
                            <option value={customer._id} key={customer._id}>
                              {customer.name}
                            </option>
                          ))}
                        </select>
                        <span className="select-arrow"></span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <span className="form-label">Categorias</span>
                        <select
                          onChange={(e) => setCategory(e.target.value)}
                          className="form-control"
                          defaultValue=""
                        >
                          <option disabled value="">
                            Selecione
                          </option>
                          <option value="HYDRAULICS">Hidráulica</option>
                          <option value="ELECTRICAL">Elétrica</option>
                          <option value="STRUCTURAL">Estruturação</option>
                        </select>
                        <span className="select-arrow"></span>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success mb-2">
                      Cadastrar
                    </button>
                    <Link to="/" type="button" className="btn btn-danger">
                      Voltar
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {credentials && (
        <Navigate to={`/orcamento/${budgetId}/${sendCategory}`} />
      )}
    </>
  );
};

export default CriarOrcamento;
