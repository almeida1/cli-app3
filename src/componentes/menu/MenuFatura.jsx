import React from "react";
import FaturaCadastrarView from "../fatura_cadastrar/FaturaCadastrarView.jsx";
import FaturaConsulta from "../fatura_consultar/FaturaConsulta.jsx";
import "./styles.css"; // Importando o CSS para estilização
import { useState, useEffect } from "react";
function MenuFatura({ onVoltar }) {
  const [exibirCadastro, setExibirCadastro] = useState(false);
  const [exibirConsulta, setExibirConsulta] = useState(false);
  const [faturas, setFaturas] = useState([]);

  const handleConsultar = () => {
    setExibirConsulta(true);
    setExibirCadastro(false); // Garante que o cadastro seja ocultado
  };

  const handleCadastrar = () => {
    setExibirCadastro(true);
    setExibirConsulta(false); // Garante que a consulta seja ocultada
  };

  const handleCancelarCadastro = () => {
    setExibirCadastro(false);
  };
  // Função handleCancelar modificada para chamar a prop onVoltar
  const handleCancelar = () => {
    setExibirCadastro(false);
    setExibirConsulta(false);
    onVoltar(); // Chama a função passada pelo Menu1
  };
  const fetchClientes = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/faturas");
      if (!response.ok) {
        throw new Error("Falha ao buscar clientes");
      }
      const data = await response.json();
      setFaturas(data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  useEffect(() => {
    if (exibirConsulta) {
      fetchClientes();
    }
  }, [exibirConsulta]);

  return (
    <div>
      <div className="title">Faturamento</div>
      <div className="button-container">
        <button onClick={handleConsultar} className="button">
          Consultar
        </button>
        <button onClick={handleCadastrar} className="button">
          Cadastrar
        </button>
        <button onClick={handleCancelar} className="button">
          Cancelar
        </button>
      </div>
      {exibirCadastro && (
        <FaturaCadastrarView onCancelar={handleCancelarCadastro} />
      )}
      {exibirConsulta && <FaturaConsulta faturas={faturas} />}
    </div>
  );
}

export default MenuFatura;
