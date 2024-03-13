const sequelize = require('../../sequelizeconnection')
const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')


const Post = sequelize.define('Post', {})

module.exports = Post