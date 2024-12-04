import React, { useState } from 'react';
import axios from 'axios';
import './CadastrarRetirada.css';

export function CadastrarRetirada() {
    const [data_retirada, setData_retirada] = useState('');
    const [quantidade_retirada, setQuantidade_retirada] = useState(1);
    const [num_registro, setNum_registro] = useState('');
    const [cracha, setCracha] = useState('');

    const cadastrarRetirada = async () => {
        if (!data_retirada || !quantidade_retirada || !num_registro || !cracha) {
            alert('Todos os campos são obrigatórios');
            return;
        }

        console.log(data_retirada)
        console.log(quantidade_retirada)
        console.log(num_registro)
        console.log(cracha)

        const epiData = {
            cracha,
            num_registro,
            data_retirada,
            quantidade_retirada,
        };
        try {
            const response = await axios.post('http://localhost:3000/retirada', epiData);
            console.log('EPI cadastrada com sucesso:', response.data);
            alert('EPI cadastrada com sucesso!');
        } catch (error) {
            console.log('Erro:', error.response?.data || error.message);
            alert('Erro interno no sistema!');
        }
    };

    return (
        <div className="containers">
            <div className="dados-retirada">
                <h2>Cadastro de Retirada</h2>
                <label className="label">Data de Retirada:</label>
                <input
                    type="date"
                    value={data_retirada}
                    onChange={(e) => setData_retirada(e.target.value)}
                    className="entrada"
                    placeholder="Digite a data da retirada"
                />

                <label className="label">Quantidade Retirada:</label>
                <input
                    type="number"
                    value={quantidade_retirada}
                    onChange={(e) => setQuantidade_retirada(Number(e.target.value))}
                    className="entrada"
                    min="1"
                />

                <label className="label">Registro do EPI:</label>
                <input
                    value={num_registro}
                    onChange={(e) => setNum_registro(Number(e.target.value))}
                    className="entrada"
                    placeholder="Digite o número do registro do EPI"
                />

                <label className="label">Crachá do Funcionário:</label>
                <input
                    value={cracha}
                    onChange={(e) => setCracha(Number(e.target.value))}
                    className="entrada"
                    placeholder="Digite o número do crachá"
                />

                <button className="botao" onClick={cadastrarRetirada}>Cadastrar</button>
            </div>
        </div>
    );
};
