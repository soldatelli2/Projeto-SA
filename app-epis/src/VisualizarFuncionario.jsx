import React, { useState, useEffect } from 'react';
import './visualizarf.css'; // Certifique-se de adicionar estilos adequados
import axios from 'axios';

export function VisualizarFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [clone, setClone] = useState([]);
  const [funcionarioEditar, setFuncionarioEditar] = useState(null); // Estado para o funcionário a ser editado

  // Função para buscar funcionários
  const buscarFuncionarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/funcionario');
      setFuncionarios(response.data.resultado);
      setClone(response.data.resultado);
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
    }
  };

  // Função para pesquisar funcionários
  const pesquisarFuncionario = () => {
    const resultado = clone.filter((funcionario) =>
      funcionario.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );
    setFuncionarios(resultado);
  };

  // Função para remover funcionário
  const removerFuncionario = async (cracha) => {
    try {
      await axios.delete(`http://localhost:3000/funcionario/${cracha}`);
      setFuncionarios(funcionarios.filter((funcionario) => funcionario.cracha !== cracha));
      alert('Funcionário removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover o funcionário:', error);
      alert('Erro ao tentar remover o funcionário.');
    }
  };

  // Função para editar funcionário
  const editarFuncionario = async (funcionario) => {
    try {
      await axios.put(`http://localhost:3000/funcionario/${funcionario.cracha}`, funcionario);
      const updatedFuncionarios = funcionarios.map((f) =>
        f.cracha === funcionario.cracha ? funcionario : f
      );
      setFuncionarios(updatedFuncionarios);
      alert('Funcionário editado com sucesso!');
      setFuncionarioEditar(null);
    } catch (error) {
      console.error('Erro ao editar o funcionário:', error);
      alert('Erro ao tentar editar o funcionário.');
    }
  };

  // Carregar funcionários na inicialização
  useEffect(() => {
    buscarFuncionarios();
  }, []);

  return (
    <div className="container-funcionarios">
      <div className="content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar Funcionário..."
            className="search-input"
            onChange={(e) => setPesquisa(e.target.value)}
          />
          <button onClick={pesquisarFuncionario} className="search-icon">🔍</button>
        </div>

        <div className="tabela-funcionarios">
          <h3>PAINEL DE FUNCIONÁRIOS</h3>
          <table>
            <thead>
              <tr>
                <th>Funcionário</th>
                <th>Cracha</th>
                <th>Cargo</th>
                <th>CPF</th>
                <th>Data Nascimento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.map((funcionario, index) => (
                <tr key={index}>
                  <td>{funcionario.nome}</td>
                  <td>{funcionario.cracha}</td>
                  <td>{funcionario.cargo}</td>
                  <td>{funcionario.cpf}</td>
                  <td>{funcionario.data_nascimento}</td>
                  <td>
                    <button onClick={() => setFuncionarioEditar(funcionario)} className="btn-editar">
                      Editar
                    </button>
                    <button onClick={() => removerFuncionario(funcionario.cracha)} className="btn-remover">
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {funcionarioEditar && (
        <div className="form-editar">
          <h3>Editar Funcionário</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editarFuncionario(funcionarioEditar);
            }}
          >
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                value={funcionarioEditar.nome}
                onChange={(e) =>
                  setFuncionarioEditar({ ...funcionarioEditar, nome: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Cargo</label>
              <input
                type="text"
                value={funcionarioEditar.cargo}
                onChange={(e) =>
                  setFuncionarioEditar({ ...funcionarioEditar, cargo: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>CPF</label>
              <input
                type="text"
                value={funcionarioEditar.cpf}
                onChange={(e) =>
                  setFuncionarioEditar({ ...funcionarioEditar, cpf: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Data de Nascimento</label>
              <input
                type="date"
                value={funcionarioEditar.data_nascimento}
                onChange={(e) =>
                  setFuncionarioEditar({ ...funcionarioEditar, data_nascimento: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn-salvar">
              Salvar alterações
            </button>
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => setFuncionarioEditar(null)}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
