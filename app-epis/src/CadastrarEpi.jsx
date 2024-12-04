import React, { useState } from 'react';
import './Cadastrarepi.css';
import axios from 'axios';

export function CadastrarEpis() {
  const [nome, setNome] = useState('');
  const [data_entrada, setData_entrada] = useState('');
  const [num_registro, setNum_registro] = useState('');
  const [quantidade, setQuantidade] = useState(1); 

  const cadastrarEpi = async () => {
    
    if (!nome || !data_entrada || !num_registro) {
      alert('Todos os campos são obrigatórios')
      return;
    }

    const epiData = {
      nome,
      num_registro,
      data_entrada,
      quantidade, 
    };

    try {
      const response = await axios.post('http://localhost:3000/epi', epiData);

      console.log('EPI cadastrado com sucesso:', response.data);
      alert('EPI cadastrado com sucesso!');
      
      
      setNome('');
      setData_entrada('');
      setNum_registro('');
      setQuantidade(1);  
    } catch (error) {
      console.error('Erro ao cadastrar EPI:', error);
      alert('Erro ao cadastrar EPI');
    }
  };

  return (
    <div className="containers">
      <div className="dados-equipamento">
        <h2>DADOS DO EQUIPAMENTO</h2>

        <div className="formulario">
          <label htmlFor="nome">Nome Equipamento</label>
          <input
            id="nome"
            type="text"
            placeholder='Digite o nome da EPI'
            className="entrada"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label htmlFor="data_entrada">Data de Entrada</label>
          <input
            id="data_entrada"
            type="date"
            className="entrada"
            value={data_entrada}
            onChange={(e) => setData_entrada(e.target.value)}
          />

          <label htmlFor="num_registro">Nº de Registro</label>
          <input
            id="num_registro"
            type="text"
            className="entrada"
            placeholder='Digite o número de registro da EPI'
            value={num_registro}
            onChange={(e) => setNum_registro(e.target.value)}
          />

          <label htmlFor="quantidade">Quantidade</label>
          <input
            id="quantidade"
            type="number"
            className="entrada"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            min="1"  
          />

          <button className="botao" onClick={cadastrarEpi}>
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
