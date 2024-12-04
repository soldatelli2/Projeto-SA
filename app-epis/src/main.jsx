import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { Home } from './Home'
import { CadastrarFuncionario } from './CadastrarFuncionario'
import { CadastrarEpis } from './CadastrarEpi'
import { CadastrarRetirada } from './CadastrarRetirada'
import { VisualizarFuncionarios } from './VisualizarFuncionario'
import { VisualizarEquipamentos } from './VisualizarEquipamentos'
import { Historico } from './Historico'

const paginas = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/cadastrar-funcionario', element: <CadastrarFuncionario /> },
  { path: '/cadastrar-epis', element: <CadastrarEpis /> },
  { path: '/cadastrar-retirada', element: <CadastrarRetirada /> },
  { path: '/visualizar-funcionarios', element: <VisualizarFuncionarios /> },
  { path: '/visualizar-equipamentos', element: <VisualizarEquipamentos /> },
  { path: '/visualizar-historico', element: <Historico /> }
])


createRoot(document.getElementById('root')).render(
  <RouterProvider router={paginas} />,
)
