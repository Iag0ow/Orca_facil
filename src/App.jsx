import React from "react";
import { useState } from "react";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import "./App.css";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Hidraulica from "./pages/Hidraulica/Hidraulica";
import Eletrica from "./pages/Eletrica/Eletrica";
import Fundacao from "./pages/Fundacao/Fundacao";
import Footer from "./components/Footer/Footer";
import Orcamento from "./pages/Orçamentos/Orcamento";
import CriarOrcamento from "./pages/CriarOrcamento/CriarOrcamento";
function App() {
  const user = localStorage.getItem("token");
  const [auth, setAuth] = useState(false);
  const handleUpdateAuth = (value) => {
    setAuth(value);
  };
  useEffect(() => {
    if (user) {
      setAuth(true);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              !auth ? (
                <Login handleFunc={handleUpdateAuth} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/"
            element={
              auth ? (
                <Home handleFunc={handleUpdateAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/hidraulica/:category"
            element={auth ? <Hidraulica /> : <Navigate to="/login" />}
          />
          <Route
            path="/eletrica/:category"
            element={auth ? <Eletrica /> : <Navigate to="/login" />}
          />
          <Route
            path="/fundacao/:category"
            element={auth ? <Fundacao /> : <Navigate to="/login" />}
          />
          <Route
            path="/orcamento/:id/:category"
            element={auth ? <Orcamento /> : <Navigate to="/login" />}
          />
          <Route
            path="/criar"
            element={auth ? <CriarOrcamento /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
