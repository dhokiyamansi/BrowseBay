"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**{
     * Helper} method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Product, {
        foreignKey: {
          name: 'category_id',
          allowNull: false,
          type: DataTypes.UUID
        }
      })
    }
  }
  Category.init(
    {
      category_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
