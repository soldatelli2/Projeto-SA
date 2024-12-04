import sequelize from '../database.js'
import { DataTypes } from 'sequelize'

const Epi = sequelize.define('Epi', {
    num_registro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        len: [6, 6],
    },
    nome: {
        type: DataTypes.STRING
    },
    data_entrada: {
        type: DataTypes.STRING
    },
    quantidade: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}, {
    createdAt: false, updatedAt: false, tableName: 'Epis'
})

export { Epi }
