// senha: 8bE6Ms7-Kk3GA0h6ybLyWQ
// bd: postgresql://matheus:<ENTER-SQL-USER-PASSWORD>@matheus-2633.jxf.gcp-southamerica-east1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full

import { Sequelize } from 'sequelize'

const conexao = new Sequelize('postgresql://matheus:8bE6Ms7-Kk3GA0h6ybLyWQ@matheus-2633.jxf.gcp-southamerica-east1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full')

try {
    await conexao.authenticate()
    console.log('Banco de dados conectado com sucesso!')
} catch (error) {
    console.error('Erro ao conectar', error)
}

export default conexao
