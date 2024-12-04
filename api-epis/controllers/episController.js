import { Epi } from "../models/EPIs.js"

const cadastrarEpi = async (req, res) => {
    try {
        const { nome, num_registro, data_entrada, quantidade } = req.body

        // Verificando se os campos obrigatórios foram enviados
        if (!nome || !num_registro || !data_entrada || quantidade === undefined) {
            return res.status(404).send({ mensagem: 'Favor informar os campos corretamente!' })
        }

        // Criando o EPI com a quantidade incluída
        const epi = await Epi.create({ nome, num_registro, data_entrada, quantidade })
        console.log(epi)

        res.status(201).send({ epi })

    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno!' })
    }
}

const listarEpis = async (req, res) => {
    try {
        const resultado = await Epi.findAll()
        console.log(resultado)
        res.status(200).send({ resultado: resultado })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno!' })
    }
}

const editarEpi = async (req, res) => {
    try {
        const num_registro = req.params.num_registro
        const { nome, data_entrada, quantidade } = req.body

        // Atualizando o EPI com a quantidade (caso tenha sido alterada)
        const resultado = await Epi.update({ nome, data_entrada, quantidade }, { where: { num_registro } })

        if (resultado[0] === 0) {
            return res.status(404).send({ mensagem: 'EPI não encontrado para editar!' })
        }

        res.status(200).send({ mensagem: 'Epi editada com sucesso!' })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno!' })
    }
}

const removerEpi = async (req, res) => {
    try {
        const num_registro = req.params.num_registro
        await Epi.destroy({ where: { num_registro } })
        res.status(200).send({ mensagem: 'Epi removida com sucesso!' })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno!' })
    }
}

export { cadastrarEpi, listarEpis, editarEpi, removerEpi }
