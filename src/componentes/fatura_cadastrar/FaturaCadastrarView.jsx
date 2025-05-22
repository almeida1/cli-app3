import React, { useState } from 'react';
import FaturaCadastrar from './FaturaCadastrar';

const FaturaCadastrarView = () => {
  const [cnpj, setCnpj] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [servico, setServico] = useState('');
  const [valor, setValor] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro('');
    setSucesso('');

    if (!cnpj || !dataVencimento || !servico || !valor) {
      setErro('Todos os campos são obrigatórios.');
      return;
    }

    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    if (!cnpjRegex.test(cnpj)) {
      setErro('Formato de CNPJ inválido. Use XX.XXX.XXX/XXXX-XX.');
      return;
    }

    if (isNaN(parseFloat(valor))) {
      setErro('O valor deve ser um número.');
      return;
    }

    const formatarData = (dataISO) => {
      const [ano, mes, dia] = dataISO.split('-');
      return `${dia}/${mes}/${ano}`;
    };

    const novaFatura = {
      cnpj: cnpj.replace(/\D/g, ''),
      dataVencimento: formatarData(dataVencimento),
      servicoContratado: servico,
      valor: parseFloat(valor),
    };

    try {
      const resultado = await FaturaCadastrar(novaFatura);
      if (resultado.success) {
        setSucesso('Fatura cadastrada com sucesso!');
        setCnpj('');
        setDataVencimento('');
        setServico('');
        setValor('');
      } else {
        setErro(resultado.error || 'Erro ao cadastrar fatura.');
      }
    } catch (error) {
      setErro(error.message || 'Ocorreu um erro ao tentar cadastrar a fatura.');
    }
  };

  const handleCnpjChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 14) value = value.substring(0, 14);
    if (value.length > 12) {
      value = `${value.substring(0, 2)}.${value.substring(2, 5)}.${value.substring(5, 8)}/${value.substring(8, 12)}-${value.substring(12)}`;
    } else if (value.length > 8) {
      value = `${value.substring(0, 2)}.${value.substring(2, 5)}.${value.substring(5, 8)}/${value.substring(8)}`;
    } else if (value.length > 5) {
      value = `${value.substring(0, 2)}.${value.substring(2, 5)}.${value.substring(5)}`;
    } else if (value.length > 2) {
      value = `${value.substring(0, 2)}.${value.substring(2)}`;
    }
    setCnpj(value);
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h4>Cadastrar Fatura</h4>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {sucesso && <p style={{ color: 'green' }}>{sucesso}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="cnpj">CNPJ:</label>
          <input
            type="text"
            id="cnpj"
            value={cnpj}
            onChange={handleCnpjChange}
            placeholder="00.000.000/0000-00"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="dataVencimento">Data de Vencimento:</label>
          <input
            type="date"
            id="dataVencimento"
            value={dataVencimento}
            onChange={(e) => setDataVencimento(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="servico">Serviço:</label>
          <input
            type="text"
            id="servico"
            value={servico}
            onChange={(e) => setServico(e.target.value)}
            placeholder="Descrição do serviço"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="valor">Valor (R$):</label>
          <input
            type="text"
            id="valor"
            value={valor}
            onChange={(e) => setValor(e.target.value.replace(',', '.'))}
            placeholder="0.00"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Confirmar
        </button>
      </form>
    </div>
  );
};

export default FaturaCadastrarView;