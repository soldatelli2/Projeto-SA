import React from 'react';
import './home.css';  // Não se esqueça de adicionar o CSS aqui
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import imagem_epi from './img/imagem-generica-epi.jpg'
import imagem_epi3 from './img/imagem-generica-epi3.jpg'

export function Home() {
  return (
    <div className="home-container">
      <Sidebar className="sidebar">
        <h1>GEPI</h1>
        <Menu>
          <SubMenu label="Cadastrar">
            <MenuItem>
              <Link to={'/cadastrar-funcionario'}>Cadastrar Funcionário</Link>
            </MenuItem>
            <MenuItem>
              <Link to={'/cadastrar-epis'}>Cadastrar EPIs</Link>
            </MenuItem>
            <MenuItem>
              <Link to={'/cadastrar-retirada'}>Cadastrar Retirada</Link>
            </MenuItem>
          </SubMenu>

          <SubMenu label="Visualizar">
            <MenuItem>
              <Link to={'/visualizar-funcionarios'}>Visualizar Funcionários</Link>
            </MenuItem>
            <MenuItem>
              <Link to={'/visualizar-equipamentos'}>Visualizar EPIs</Link>
            </MenuItem>
          </SubMenu>

          <SubMenu label="Histórico">
            <MenuItem>
              <Link to={'/visualizar-historico'}>Histórico de Retirada/Devolução</Link>
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>

      <div className="main-content">
        <div className="image-container">
          <img src={imagem_epi} alt="Imagem de EPI" className="epi-image" />
          <img src={imagem_epi3} alt="Imagem de EPI" className="epi-image" />
        </div>

        <div className="text-content">
          <div className="text-above">
            <h2>Importância do Uso de EPIs no Ambiente de Trabalho</h2>
            <p>
              O uso de Equipamentos de Proteção Individual (EPIs) é fundamental para garantir a segurança no ambiente de trabalho, prevenindo acidentes e doenças ocupacionais. Os EPIs protegem os trabalhadores de riscos como quedas, exposição a substâncias tóxicas, entre outros.
            </p>
          </div>
          <div className="text-below">
            <h2>Cuidados Essenciais com os EPIs</h2>
            <p>
              Além de utilizar corretamente os EPIs, é crucial realizar manutenções periódicas e garantir que eles estejam em bom estado. Treinamentos sobre como usar e cuidar dos equipamentos devem ser realizados constantemente para maximizar a segurança.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
