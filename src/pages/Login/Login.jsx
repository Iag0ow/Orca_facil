import React from "react";
import { useState } from "react";
import "./Login.css";
import orca from "../../image/orca_facil.png";
import { Navigate } from "react-router-dom";
import { login } from "../../../utils/Config";
const Login = ({ handleFunc }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState(false);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const loginForm = {
      email,
      password,
    };
    const resAuth = await login(loginForm);
    if (resAuth == true) {
      setCredentials(true);
      handleFunc(true);
    } else {
      setError(resAuth.message);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="hero d-flex align-items-center justify-content-center">
        <form className="form-login" onSubmit={handleSubmit}>
          <div className="box-img">
            <img className="img-login" src={orca} alt="" />
          </div>
          {error && <h6 className="text-center text-danger">{error}</h6>}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              placeholder="E-mail"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="form-control"
              required
            />
          </div>
          {loading ? (
            <button disabled type="submit" className="submit btn btn-danger">
              Entrar
            </button>
          ) : (
            <button type="submit" className="submit btn btn-danger">
              Entrar
            </button>
          )}
        </form>
        {credentials && <Navigate to="/" />}
      </div>
    </div>
  );
};

export default Login;
