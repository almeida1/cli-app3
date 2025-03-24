import React, { useState, useEffect } from "react";
import "./App.css";
import ClienteCadastrarView from "./componentes/cadastrar_cliente/ClienteCadastrarView";
import ClienteConsulta from "./componentes/consultar_cliente/ClienteConsulta";

const App = () => {
  const [exibirCadastro, setExibirCadastro] = useState(false);
  const [exibirConsulta, setExibirConsulta] = useState(false);
  const [clientes, setClientes] = useState([]);

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

  const fetchClientes = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/v1/clientes");
      if (!response.ok) {
        throw new Error("Falha ao buscar clientes");
      }
      const data = await response.json();
      setClientes(data);
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
      <div className="title">Gerenciamento de Clientes</div>
      <div className="button-container">
        <button onClick={handleConsultar} className="button">
          Consultar
        </button>
        <button onClick={handleCadastrar} className="button">
          Cadastrar
        </button>
      </div>
      {exibirCadastro && (
        <ClienteCadastrarView onCancelar={handleCancelarCadastro} />
      )}
      {exibirConsulta && <ClienteConsulta clientes={clientes} />}
    </div>
  );
};

export default App;
