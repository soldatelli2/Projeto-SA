import React, { useState } from 'react';
import './Cadastrar.css';
import axios from 'axios';

export function CadastrarFuncionario() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [data_nascimento, setData_nascimento] = useState('');
  const [cargo, setCargo] = useState('');
  const [cracha, setCracha] = useState(''); 

  const cadastrarFuncionario = async () => {
    
    if (!nome || !data_nascimento || !cpf || !cargo || !cracha) {
      alert('Todos os campos são obrigatórios');
      return;
    }

    const funcionarioData = {
      nome,
      cpf,
      data_nascimento,
      cargo,
      cracha,
    };

    try {
      const response = await axios.post('http://localhost:3000/funcionario', funcionarioData);

      console.log('Funcionário cadastrado com sucesso:', response.data);
      alert('Funcionário cadastrado com sucesso!');

      // Limpando os campos após o cadastro
      setNome('');
      setData_nascimento('');
      setCpf('');
      setCargo('');
      setCracha('');
    } catch (error) {
      console.error('Erro ao cadastrar Funcionário:', error);
      alert('Erro ao cadastrar Funcionário');
    }
  };

  return (
    <div className="containerf">
      <div className="dados-fun">
        <h2>DADOS FUNCIONÁRIO</h2>

        <div className="formulariof">
          <label className="labelf" htmlFor="nome">Nome Completo</label>
          <input
            id="nome"
            type="text"
            className="entrada"
            placeholder='Nome Completo do Funcionário'
            value={nome}
            onChange={(e) => setNome(e.target.value)} />

          <label className="labelf" htmlFor="data_nascimento">Data Nascimento</label>
          <input
            id="data_nascimento"
            type="date"
            className="entrada"
            value={data_nascimento}
            onChange={(e) => setData_nascimento(e.target.value)} />

          <label className="labelf" htmlFor="cpf">CPF</label>
          <input
            id="cpf"
            type="text"
            className="entrada"
            placeholder='Digite o CPF do Funcionário'
            value={cpf}
            onChange={(e) => setCpf(e.target.value)} />

          <label className="labelf" htmlFor="cargo">Função</label>
          <input
            id="cargo"
            type="text"
            className="entrada"
            placeholder='Digite a função do Funcionário'
            value={cargo}
            onChange={(e) => setCargo(e.target.value)} />

          <label className="labelf" htmlFor="cracha">Crachá</label>
          <input
            id="cracha"
            type="text"
            className="entrada"
            placeholder='Digite o crachá do Funcionário'
            value={cracha}
            onChange={(e) => setCracha(e.target.value)} />

          <button className="botaof" onClick={cadastrarFuncionario}>
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
