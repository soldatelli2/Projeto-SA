import { Funcionario } from "../models/Funcionario.js";

const cadastrarFuncionario = async (req, res) => {
    try {
        const { nome, cpf, data_nascimento, cargo, cracha } = req.body;

        // Verificação dos campos obrigatórios
        if (!nome || !cpf || !data_nascimento || !cargo || !cracha) {
            return res.status(400).send({ mensagem: 'Favor informar todos os campos corretamente!' });
        }

        // Verificação se o crachá já existe
        const crachaExistente = await Funcionario.findOne({ where: { cracha } });
        if (crachaExistente) {
            return res.status(409).send({ mensagem: 'Já existe um funcionário com este crachá!' });
        }

        // Criação do funcionário
        const funcionario = await Funcionario.create({ nome, cpf, data_nascimento, cargo, cracha });
        res.status(201).send({ mensagem: 'Funcionário cadastrado com sucesso!', funcionario });

    } catch (erro) {
        console.log(erro);
        res.status(500).send({ mensagem: 'Erro interno!' });
    }
};

const listarFuncionarios = async (req, res) => {
    try {
        const resultado = await Funcionario.findAll();
        res.status(200).send({ resultado });
    } catch (erro) {
        console.log(erro);
        res.status(500).send({ mensagem: 'Erro interno!' });
    }
};

const editarFuncionario = async (req, res) => {
    try {
        const cracha = req.params.cracha;
        const { nome, cpf, data_nascimento, cargo } = req.body;

        // Verificação dos campos obrigatórios
        if (!nome || !cpf || !data_nascimento || !cargo) {
            return res.status(400).send({ mensagem: 'Favor informar todos os campos corretamente!' });
        }

        const resultado = await Funcionario.update(
            { nome, cpf, data_nascimento, cargo },
            { where: { cracha } }
        );

        if (resultado[0] === 0) {
            return res.status(404).send({ mensagem: 'Funcionário não encontrado para editar!' });
        }

        res.status(200).send({ mensagem: 'Funcionário alterado com sucesso!' });

    } catch (erro) {
        console.log(erro);
        res.status(500).send({ mensagem: 'Erro interno!' });
    }
};

const removerFuncionario = async (req, res) => {
    try {
        const cracha = req.params.cracha;
        const resultado = await Funcionario.destroy({ where: { cracha } });

        if (resultado === 0) {
            return res.status(404).send({ mensagem: 'Funcionário não encontrado!' });
        }

        res.status(200).send({ mensagem: 'Funcionário removido com sucesso!' });
    } catch (erro) {
        console.log(erro);
        res.status(500).send({ mensagem: 'Erro interno!' });
    }
};

export { cadastrarFuncionario, listarFuncionarios, editarFuncionario, removerFuncionario };
