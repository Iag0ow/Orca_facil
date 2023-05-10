import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../../utils/Config";
import Menus from "../../components/Menus/Menus";
const Eletrica = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setProducts(await getProducts("ELECTRICAL"));
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="container table-itens mt-5 p-5">
        <h1 className="text-center">Orçamento Eletrica</h1>
        <table className="table table-hover">
          <thead>
            <tr className="table-danger">
              <th>Nome</th>
              <th>Preço</th>
              <th>Marca</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.brand}</td>
                  <td>
                    <div className="pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Menus category={category} setProducts={setProducts} />
      </div>
    </>
  );
};

export default Eletrica;
