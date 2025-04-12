import React from "react";
import "./FaturaConsultarStyles.css"; // Importando o CSS para estilização
// Componente para consultar fatura
function FaturaConsultarView() {
  return (
    <div>
      <div className="title-cadastrar-view">Consultar Fatura</div>
      <form>
        <div>
          <label htmlFor="numeroFatura">Número da Fatura:</label>
          <input type="text" id="numeroFatura" name="numeroFatura" />
        </div>
        <button type="submit">Consultar</button>
      </form>
    </div>
  );
}

export default FaturaConsultarView;
