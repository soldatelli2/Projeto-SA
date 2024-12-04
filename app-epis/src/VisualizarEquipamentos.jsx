import React, { useState, useEffect } from 'react';
import './visualizarE.css';
import axios from 'axios';

export function VisualizarEquipamentos() {
  const [epis, setEpis] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [clone, setClone] = useState([]);
  const [epiEditar, setEpiEditar] = useState(null); // Estado para o EPI a ser editado

  const buscarEpis = async () => {
    try {
      const response = await axios.get('http://localhost:3000/epi');
      setEpis(response.data.resultado);
      setClone(response.data.resultado);
    } catch (error) {
      console.error(error);
    }
  };

  const pesquisarEpi = () => {
    const resultado = clone.filter((epi) =>
      epi.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );
    setEpis(resultado);
  };

  const removerEpi = async (num_registro) => {
    try {
      await axios.delete(`http://localhost:3000/epi/${num_registro}`);
      setEpis(epis.filter((epi) => epi.num_registro !== num_registro));
      alert('Epi removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover a Epi:', error);
      alert('Erro ao tentar remover a Epi.');
    }
  };

  const editarEpi = async (epi) => {
    try {
      await axios.put(`http://localhost:3000/epi/${epi.num_registro}`, epi);
      const updatedEpis = epis.map((e) =>
        e.num_registro === epi.num_registro ? epi : e
      );
      setEpis(updatedEpis);
      alert('Epi editado com sucesso!');
      setEpiEditar(null); // Fechar o formulário de edição
    } catch (error) {
      console.error('Erro ao editar a Epi:', error);
      alert('Erro ao tentar editar a Epi.');
    }
  };

  useEffect(() => {
    buscarEpis();
  }, []);

  return (
    <div className="container-equipamentos">
      <div className="conteudo">
        <div className="barra-pesquisa">
          <input
            type="text"
            placeholder="Pesquisar EPI..."
            className="search-input"
            onChange={(e) => setPesquisa(e.target.value)}
          />
          <button onClick={pesquisarEpi} className="search-icon">
            🔍
          </button>
        </div>

        <div className="tabela-equipamentos">
          <h3>PAINEL DE EQUIPAMENTOS</h3>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Nº Registro</th>
                <th>Data de entrada</th>
                <th>Quantidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {epis.map((epi, index) => (
                <tr key={index}>
                  <td>{epi.nome}</td>
                  <td>{epi.num_registro}</td>
                  <td>{epi.data_entrada}</td>
                  <td>{epi.quantidade}</td>
                  <td>
                    <button
                      onClick={() => setEpiEditar(epi)} // Setar o EPI para edição
                      className="btn-editar"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => removerEpi(epi.num_registro)}
                      className="btn-remover"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {epiEditar && (
        <div className="form-editar">
          <h3>Editar EPI</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editarEpi(epiEditar);
            }}
          >
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                value={epiEditar.nome}
                onChange={(e) =>
                  setEpiEditar({ ...epiEditar, nome: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Data de Entrada</label>
              <input
                type="date"
                value={epiEditar.data_entrada}
                onChange={(e) =>
                  setEpiEditar({ ...epiEditar, data_entrada: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Quantidade</label>
              <input
                type="number"
                value={epiEditar.quantidade}
                onChange={(e) =>
                  setEpiEditar({ ...epiEditar, quantidade: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn-salvar">
              Salvar
            </button>
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => setEpiEditar(null)}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}