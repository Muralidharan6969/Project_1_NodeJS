const {DataTypes} = require('sequelize');
const {sequelize} = require('../../config/SequalizePostgres')

const Category = sequelize.define("Category", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      categoryName: {
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

module.exports = {
    Category
}