import React from "react";
import { useState, useEffect } from "react";
import Aside from "../../components/Aside/Aside";
import "./Opcoes.css";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import { getBudgetsBySellerId } from "../../../utils/Config";
const Opcoes = (handleFunc) => {
  const [id] = useState(localStorage.getItem("user_id"));
  const [avaliable, setAvaliable] = useState(false)
  const [idBudget, setIdBudget] = useState(false);

  useEffect(() => {
    async function fetchData() {
     const result = await getBudgetsBySellerId(id);
      if (result) {
        setIdBudget(result[0]._id);
        setAvaliable(true)
      } else {
        alert('Você ainda não possui orçamentos')
        }
    }
    fetchData()
 }, [])
  
  return (
    <>
      <NavBar value={handleFunc} />
      <div className="d-flex bottom-margin">
        <div className="container">
          <h1 className="text-center mt-5 title-orc">Opções de Gestão</h1>
          <div className="row mt-5">
            <div className="opcoes">
              <div className="col-md-4">
                <Link to="/criar">
                  <div className="category2 hidraulica2"></div>
                </Link>
                <h1 className="text-center categories mt-3">Criar Orçamento</h1>
              </div>
              <div className="col-md-4">
                {avaliable ? (
                  <Link to={`/orcamentosEdit/${id}/budget/${idBudget}`}>
                    <div className="category2 eletrica2"></div>
                  </Link>
                ) : (
                  <Link to={`/orcamentos`}>
                    <div className="category2 eletrica2"></div>
                  </Link>
                )}
                <h1 className="text-center categories mt-3">
                  Editar Orçamentos
                </h1>
              </div>
            </div>

            {/* <div className="col-md-4">
              <Link to={`fundacao/STRUCTURAL`}>
                <div className="category2 fundacao2"></div>
              </Link>
              <h1 className="text-center categories mt-3">Gerar PDF</h1>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Opcoes;
