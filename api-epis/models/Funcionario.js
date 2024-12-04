import sequelize from '../database.js'
import { DataTypes } from 'sequelize'

const Funcionario = sequelize.define('Funcionario', {
    cracha: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        len: [6, 6],
        isNumeric: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [11, 11],
            isNumeric: true
        }
    },
    data_nascimento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    createdAt: false, updatedAt: false, tableName: 'Funcionarios'
})

export { Funcionario }
