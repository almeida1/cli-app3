// Importando as dependências necessárias
import React, { useState } from "react";
import "./FaturaCadastrarStyles.css"; // Importando o CSS para estilização
function FaturaCadastrarView() {
  const [formData, setFormData] = useState({
    numero: "",
    CNPJdaContratada: "",
    dataEmissao: "",
    dataVencimento: "",
    servicoContratado: "",
    valor: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <div>
      <div className="title-cadastrar-view">Cadastrar Fatura</div>
      <form onSubmit={handleSubmit} className="fatura-form">
        <div>
          <label htmlFor="numero">Número:</label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="CNPJdaContratada">CNPJ:</label>
          <input
            type="text"
            id="CNPJdaContratada"
            name="CNPJdaContratada"
            value={formData.CNPJdaContratada}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="dataVencimento">Data de Vencimento:</label>
          <input
            type="date"
            id="dataVencimento"
            name="dataVencimento"
            value={formData.dataVencimento}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="servicoContratado">Serviço Contratado:</label>
          <input
            type="text"
            id="servicoContratado"
            name="servicoContratado"
            value={formData.servicoContratado}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="valor">Valor:</label>
          <input
            type="number"
            id="valor"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default FaturaCadastrarView;
