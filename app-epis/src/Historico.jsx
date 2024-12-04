import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './historico.css';

export function Historico() {
  const [historico, setHistorico] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [clone, setClone] = useState([]);

  const buscarRetiradas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/retirada');
      setHistorico(response.data.resultado);
      setClone(response.data.resultado); // Mantém o histórico original para restaurar se necessário
    } catch (error) {
      console.error('Erro ao buscar retiradas:', error);
    }
  };

  const pesquisarRetirada = () => {
    const pesquisaTrimmed = pesquisa.trim().toLowerCase(); // Remove espaços e converte para minúsculas
  
    // Se o campo de pesquisa estiver vazio, restaura o histórico original
    if (!pesquisaTrimmed) {
      setHistorico(clone);
    } else {
      // Filtra as retiradas com base no número de registro, comparando de forma insensível a maiúsculas/minúsculas
      const resultado = clone.filter((retirada) =>
        retirada.registro_epi.toLowerCase().includes(pesquisaTrimmed)
      );
      setHistorico(resultado);
    }
  };
  

  // Função para realizar a devolução
  const realizarDevolucao = async (id) => {
    try {
      // Envia uma requisição DELETE para o servidor para marcar a devolução
      await axios.delete(`http://localhost:3000/retirada/${id}`);
      // Atualiza o estado removendo o item devolvido
      setHistorico(historico.filter((retirada) => retirada.id !== id));
      alert('Devolução realizada com sucesso!');
    } catch (error) {
      console.error('Erro ao realizar devolução:', error);
      alert('Erro ao realizar devolução.');
    }
  };

  useEffect(() => {
    buscarRetiradas();
  }, []);

  return (
    <div className="container-historico">
      <div className="barra-superior">
        <div className="barra-pesquisa">
          <input
            type="text"
            placeholder="Pesquisar histórico..."
            className="entrada-pesquisa"
            onChange={(e) => setPesquisa(e.target.value)}
          />
          <button onClick={pesquisarRetirada} className="icone-pesquisa">🔍</button>
        </div>
      </div>

      <div className="lista-historico">
        <div className="tabela-equipamentos">
          <table>
            <thead>
              <tr>
                <th>Cracha</th>
                <th>Número registro</th>
                <th>Data de entrada</th>
                <th>Quantidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((retirada, index) => (
                <tr key={index}>
                  <td>{retirada.cracha_funcionario}</td>
                  <td>{retirada.registro_epi}</td>
                  <td>{retirada.data_retirada}</td>
                  <td>{retirada.quantidade_retirada}</td>
                  <td>
                    <button
                      onClick={() => realizarDevolucao(retirada.id)}
                      className="botao-devolucao"
                    >
                      Devolução
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
