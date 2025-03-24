import React from "react";
import PropTypes from "prop-types";
import "./ClienteConsultaStyles.css";

function ClienteConsultaView({ clientes }) {
  return (
    <div className="cliente-view">
      <h5>Lista de Clientes</h5>
      {clientes.length > 0 ? (
        <table id="tabela_consulta" className="cliente-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>CPF</th>
              <th>Nome</th>
              <th>CEP</th>
              <th>Endereço</th>
              <th>e-mail</th>
              <th>Data de Cadastro</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.cep}</td>
                <td>{cliente.endereco}</td>
                <td>{cliente.email}</td>
                <td>{cliente.dataCadastro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum cliente encontrado.</p>
      )}
    </div>
  );
}

ClienteConsultaView.propTypes = {
  clientes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      cpf: PropTypes.string.isRequired,
      nome: PropTypes.string.isRequired,
      cep: PropTypes.string.isRequired,
      endereco: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      dataCadastro: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ClienteConsultaView;
