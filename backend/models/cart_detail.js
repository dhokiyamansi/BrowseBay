"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart_detail.init(
    {
      cart_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        references: {
          model: "Cart",
          key: "cart_id",
        },
        onDelete: "CASCADE",
      },
      product_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        references: {
          model: "Product",
          key: "product_id",
        },
        onDelete: "CASCADE",
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Cart_detail",
    }
  );
  return Cart_detail;
};
