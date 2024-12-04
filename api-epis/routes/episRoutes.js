import express from 'express'
import { listarEpis, cadastrarEpi, editarEpi, removerEpi } from '../controllers/episController.js'
const router = express.Router()

router.get('/epi', listarEpis)
router.post('/epi', cadastrarEpi)
router.put('/epi/:num_registro', editarEpi)
router.delete('/epi/:num_registro', removerEpi)

export default router