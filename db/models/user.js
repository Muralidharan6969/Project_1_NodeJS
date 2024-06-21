const {DataTypes} = require('sequelize');
const {sequelize} = require('../../config/SequalizePostgres');
const { Product } = require('./product');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');

const User = sequelize.define("User", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userType: {
            type: DataTypes.ENUM('0', '1', '2')
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        deletedAt: {
            type: DataTypes.DATE
        }
    },
    {
        paranoid: true 
    }
);

User.hasMany(Product, {foreignKey: 'createdBy'});
Product.belongsTo(User, {foreignKey: 'createdBy'});

module.exports = {
    User
}