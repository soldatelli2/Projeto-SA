import express from 'express'
import episRoutes from './routes/episRoutes.js'
import funcionarioRoutes from './routes/funcionarioRoutes.js'
import retiradaRoutes from './routes/retiradaRoutes.js'
import cors from 'cors'

const app = express()

import sequelize from './database.js'
try {
    await sequelize.sync({  });
} catch (erro) {
    console.log(erro)
}

app.use(express.json())
app.use(cors())
app.use(episRoutes)
app.use(funcionarioRoutes)
app.use(retiradaRoutes)

app.listen(3000, () => console.log('Servidor rodando!'))

// force: true