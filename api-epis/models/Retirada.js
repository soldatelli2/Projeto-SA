import sequelize from '../database.js'
import { DataTypes } from 'sequelize'
import { Epi } from './EPIs.js'
import { Funcionario } from './Funcionario.js'

const Retirada = sequelize.define('Retirada', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data_retirada: {
        type: DataTypes.STRING
    },
    quantidade_retirada: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    registro_epi: {
        type: DataTypes.INTEGER
    },
    cracha_funcionario: {
        type: DataTypes.INTEGER
    }
}, {
    createdAt: false, updatedAt: false, tableName: 'Retirada'
})

Retirada.belongsTo(Epi, { foreignKey: 'registro_epi', as: 'epi' });
Retirada.belongsTo(Funcionario, { foreignKey: 'cracha_funcionario', as: 'funcionario' });

export { Retirada }
