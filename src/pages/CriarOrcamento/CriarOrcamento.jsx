import React from "react";
import "./CriarOrcamento.css";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import {
  getCustomersByName,
  getUsersByName,
  setBudget,
} from "../../../utils/Config";
import { useState, useEffect } from "react";
const CriarOrcamento = () => {
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [budgedName, setBudgedName] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [category, setCategory] = useState("");
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
    if (!customerId == "" && sellerId == "") {
      const obj = {
        budgedName,
        sellerId,
        customerId,
        category,
      };
      console.log("objeto enviado: ", obj);
      const retorno = await setBudget(JSON.stringify(obj));
      console.log("retorno: ", retorno);
    }
  };
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
                          onChange={(e) => setBudgedName(e.target.value)}
                          type="text"
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
                          className="form-control"
                          onChange={(e) => setSellerId(e.target.value)}
                        >
                          <option disabled selected value="">
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
                          onChange={(e) => {
                            setCustomerId(e.target.value);
                          }}
                          className="form-control"
                        >
                          <option disabled selected value="">
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
                        >
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
    </>
  );
};

export default CriarOrcamento;
