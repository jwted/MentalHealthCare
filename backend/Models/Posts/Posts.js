const sequelize = require('../../sequelizeconnection')
const { Sequelize, DataTypes } = require('sequelize')


const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTERGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTERGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
}, {
    tableName: 'posts',
    timestamps: false,
})

module.exports = Post