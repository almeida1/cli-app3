import React, { useState } from 'react';

const FaturaCadastrarView = () => {
  // Estados para cada campo do formulário
  const [cnpj, setCnpj] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [servico, setServico] = useState('');
  const [valor, setValor] = useState('');
  const [erro, setErro] = useState(''); // Estado para mensagens de erro
  const [sucesso, setSucesso] = useState(''); // Estado para mensagens de sucesso

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    setErro(''); // Limpa erros anteriores
    setSucesso(''); // Limpa mensagens de sucesso anteriores

    // Validação básica (pode ser expandida)
    if (!cnpj || !dataVencimento || !servico || !valor) {
      setErro('Todos os campos são obrigatórios.');
      return;
    }

    // Validação do formato do CNPJ (pode ser utilizado biblioteca 'cnpj')
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/; // Formato XX.XXX.XXX/XXXX-XX
    if (!cnpjRegex.test(cnpj)) {
      setErro('Formato de CNPJ inválido. Use XX.XXX.XXX/XXXX-XX.');
      return;
    }

    // Validação do valor (deve ser um número)
    if (isNaN(parseFloat(valor))) {
      setErro('O valor deve ser um número.');
      return;
    }

    // Objeto com os dados da fatura
    const formatarData = (dataISO) => {
       const [ano, mes, dia] = dataISO.split('-');
       return `${dia}/${mes}/${ano}`;
    };
    const novaFatura = {
      cnpj: cnpj.replace(/\D/g, ''), // Remove a formatação
      dataVencimento: formatarData(dataVencimento),
      servico,
      valor: parseFloat(valor), // Converte o valor para número
    };

    // chamada para API com objetivo de salvar os dados
    try {
      
      const response = await fetch('http://localhost:8080/api/v1/faturas', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(novaFatura),
       });

       if (!response.ok) {
        console.log('Fatura a ser cadastrada:', novaFatura);
         const errorData = await response.json();
         throw new Error(errorData.message || 'Erro ao cadastrar fatura.');
       }

      console.log('Fatura a ser cadastrada:', novaFatura);
      setSucesso('Fatura cadastrada com sucesso!');

      // Limpar o formulário após o sucesso
      setCnpj('');
      setDataVencimento('');
      setServico('');
      setValor('');

    } catch (error) {
      setErro(error.message || 'Ocorreu um erro ao tentar cadastrar a fatura.');
      console.error('Erro ao cadastrar fatura:', error);
    }
  };

  // Função para formatar CNPJ enquanto o usuário digita
  const handleCnpjChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    if (value.length > 14) {
      value = value.substring(0, 14);
    }
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
            type="text" // Usar text para permitir formatação, mas validar como número
            id="valor"
            value={valor}
            onChange={(e) => setValor(e.target.value.replace(',', '.'))} // Substitui vírgula por ponto para facilitar a conversão
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
          Cadastrar Fatura
        </button>
      </form>
    </div>
  );
};

export default FaturaCadastrarView;