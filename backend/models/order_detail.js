"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order_detail.init(
    {
      order_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        references: {
          model: "Order",
          key: "order_id",
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
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      sequelize,
      modelName: "Order_detail",
    }
  );
  return Order_detail;
};
