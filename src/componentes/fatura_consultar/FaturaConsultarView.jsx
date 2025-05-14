import React from "react";
import PropTypes from "prop-types";
import "./FaturaConsultarStyles.css";

function FaturaConsultaView({ faturas }) {
  if (!Array.isArray(faturas) || faturas.length === 0) {
    return <div className="fatura-sem-dados">Nenhuma fatura encontrada.</div>;
  }

  return (
    <div className="fatura-view">
      <h3>Lista de Faturas</h3>
      <table id="tabela_fatura" className="fatura-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>CNPJ</th>
            <th>Serviço</th>
            <th>Valor</th>
            <th>Data de Vencimento</th>
          </tr>
        </thead>
        <tbody>
          {faturas.map((fatura) => (
            <tr key={fatura.id || fatura.cnpj}>
              <td>{fatura.id}</td>
              <td>{fatura.cnpj}</td>
              <td>{fatura.servico}</td>
              <td>{Number(fatura.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
              <td>{fatura.dataVencimento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

FaturaConsultaView.propTypes = {
  faturas: PropTypes.array.isRequired,
};

export default FaturaConsultaView;