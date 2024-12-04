import { Retirada } from "../models/Retirada.js";
import { Funcionario } from "../models/Funcionario.js";
import { Epi } from "../models/EPIs.js";

const cadastrarRetirada = async (req, res) => {
    try {
        const { cracha, num_registro, data_retirada, quantidade_retirada } = req.body;

        if (!cracha || !num_registro || !data_retirada || !quantidade_retirada) {
            return res.status(400).send({ mensagem: 'Todos os campos são obrigatórios!' });
        }

        // Verifica se o funcionário e o EPI existem
        const funcionario = await Funcionario.findByPk(cracha);
        const epi = await Epi.findByPk(num_registro);

        if (!funcionario || !epi) {
            return res.status(404).send({ mensagem: 'Funcionário ou EPI não encontrado!' });
        }

        // Verifica se há quantidade suficiente de EPI para a retirada
        if (epi.quantidade <= quantidade_retirada) {
            return res.status(400).send({ mensagem: 'Quantidade insuficiente de EPI para a retirada!' });
        }

        // Atualiza a quantidade do EPI após a retirada
        const novaQuantidade = epi.quantidade - quantidade_retirada;
        await epi.update({ quantidade: novaQuantidade });

        // Cria a retirada
        const retirada = await Retirada.create({
            cracha_funcionario: cracha,
            registro_epi: num_registro,
            data_retirada,
            quantidade_retirada
        });

        res.status(201).send({ retirada });

    } catch (erro) {
        console.error(erro);
        res.status(201).send(erro);
    }
};

const listarRetiradas = async (req, res) => {
    try {
        const resultado = await Retirada.findAll({
            include: [
                { model: Funcionario, as: 'funcionario' },
                { model: Epi, as: 'epi' }
            ]
        });
        res.status(200).send({ resultado });
    } catch (erro) {
        console.error(erro);
        res.status(500).send({ mensagem: 'Erro interno!' });
    }
};

const editarRetirada = async (req, res) => {
    try {
        const id = req.params.id;
        const { data_retirada, quantidade_retirada } = req.body;

        const retirada = await Retirada.findByPk(id);
        if (!retirada) {
            return res.status(404).send({ mensagem: 'Retirada não encontrada!' });
        }

        // Recupera o EPI para atualizar a quantidade
        const epi = await Epi.findByPk(retirada.registro_epi);
        if (!epi) {
            return res.status(404).send({ mensagem: 'EPI associado à retirada não encontrado!' });
        }

        // Desfaz a retirada anterior (restitui a quantidade no estoque)
        const restaura_quantidade = parseInt(epi.quantidade) + parseInt(retirada.quantidade_retirada);
        epi.quantidade = restaura_quantidade
        await epi.save();

        // Atualiza a retirada (se necessário)
        retirada.data_retirada = data_retirada || retirada.data_retirada;
        retirada.quantidade_retirada = quantidade_retirada || retirada.quantidade_retirada;

        // Atualiza a quantidade do EPI
        if (quantidade_retirada) {
            if (epi.quantidade <= quantidade_retirada) {
                return res.status(400).send({ mensagem: 'Quantidade insuficiente de EPI para a nova retirada!' });
            }

            // Atualiza a quantidade do EPI após a nova retirada
            epi.quantidade -= quantidade_retirada;
            await epi.save();
        }

        await retirada.save();
        res.status(200).send({ mensagem: 'Retirada editada com sucesso!' });

    } catch (erro) {
        console.error(erro);
        res.status(500).send({ mensagem: 'Erro interno!' });
    }
};

const removerRetirada = async (req, res) => {
    try {
        const id = req.params.id;
        const retirada = await Retirada.findByPk(id);

        if (!retirada) {
            return res.status(404).send({ mensagem: 'Retirada não encontrada!' });
        }

        // Recupera o EPI associado à retirada
        const epi = await Epi.findByPk(retirada.registro_epi);
        if (!epi) {
            return res.status(404).send({ mensagem: 'EPI associado à retirada não encontrado!' });
        }

        // Restaura a quantidade do EPI ao estoque
        const restaura_quantidade = parseInt(epi.quantidade) + parseInt(retirada.quantidade_retirada);
        epi.quantidade = restaura_quantidade
        await epi.save();

        // Remove a retirada
        await Retirada.destroy({ where: { id } });

        res.status(200).send({ mensagem: 'Retirada removida com sucesso!' });

    } catch (erro) {
        console.error(erro);
        res.status(500).send({ mensagem: 'Erro interno!' });
    }
};

export { cadastrarRetirada, listarRetiradas, editarRetirada, removerRetirada };
