import React from "react";
import ClienteCadastrarView from "../cadastrar_cliente/ClienteCadastrarView.jsx";
import ClienteConsulta from "../consultar_cliente/ClienteConsulta.jsx";
import "./styles.css"; // Importando o CSS para estilização
import { useState, useEffect } from "react";

function MenuCliente({ onVoltar }) {
  // Recebe a função onVoltar como prop
  const [exibirCadastro, setExibirCadastro] = useState(false);
  const [exibirConsulta, setExibirConsulta] = useState(false);
  const [clientes, setClientes] = useState([]);

  const handleConsultar = () => {
    setExibirConsulta(true);
    setExibirCadastro(false);
  };

  const handleCadastrar = () => {
    setExibirCadastro(true);
    setExibirConsulta(false);
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
        <button onClick={handleCancelar} className="button">
          Cancelar
        </button>
      </div>
      {exibirCadastro && (
        <ClienteCadastrarView onCancelar={handleCancelarCadastro} />
      )}
      {exibirConsulta && <ClienteConsulta clientes={clientes} />}
    </div>
  );
}

export default MenuCliente;
