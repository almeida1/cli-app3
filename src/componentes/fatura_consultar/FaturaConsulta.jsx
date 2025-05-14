import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FaturaConsultarView from "./FaturaConsultarView";

function FaturaConsulta({ atualizarConsulta }) {
  const [faturas, setFaturas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaturas = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/faturas"
        );
        if (!response.ok) {
          throw new Error("Erro na requisição");
        }
        const data = await response.json();
        setFaturas(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Realiza a consulta sempre que o valor de 'atualizarConsulta' mudar
    fetchFaturas();
  }, [atualizarConsulta]);

  return (
    <div>
      {loading && <div>Carregando...</div>}
      {error && <div>Erro: {error}</div>}
      {faturas ? (
        <FaturaConsultarView faturas={faturas} />
      ) : (
        <div>Nenhuma fatura encontrada</div>
      )}
    </div>
  );
}

// Validação da prop
FaturaConsulta.propTypes = {
  atualizarConsulta: PropTypes.number.isRequired,
};

export default FaturaConsulta;