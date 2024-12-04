import express from 'express'
import { cadastrarRetirada, listarRetiradas, editarRetirada, removerRetirada } from '../controllers/retiradaController.js'
const router = express.Router()

router.get('/retirada', listarRetiradas)
router.post('/retirada', cadastrarRetirada)
router.put('/retirada/:id', editarRetirada)
router.delete('/retirada/:id', removerRetirada)

export default router