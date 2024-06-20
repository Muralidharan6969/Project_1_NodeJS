const {DataTypes} = require('sequelize');
const {sequelize} = require('../../config/SequalizePostgres')

const Product = sequelize.define("Product", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        title: {
			type: DataTypes.STRING,
        },
        productImage: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        price: {
            type: DataTypes.DECIMAL
        },
        shortDescription: {
            type: DataTypes.TEXT,
        },
        description: {
            type: DataTypes.TEXT
        },
		productURL: {
            type: DataTypes.STRING
        },
		category: {
			type: DataTypes.ARRAY(DataTypes.STRING),
		},
		createdBy: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Users',
				key: 'id',
			},
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
    });

module.exports = {
    Product
}