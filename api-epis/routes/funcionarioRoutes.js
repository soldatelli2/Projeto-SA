import express from 'express'
import { cadastrarFuncionario, listarFuncionarios, editarFuncionario, removerFuncionario } from '../controllers/funcionarioController.js'
const router = express.Router()

router.get('/funcionario', listarFuncionarios)
router.post('/funcionario', cadastrarFuncionario)
router.put('/funcionario/:cracha', editarFuncionario)
router.delete('/funcionario/:cracha', removerFuncionario)

export default router