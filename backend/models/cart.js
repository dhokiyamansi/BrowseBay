"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsToMany(models.Product, {
        through: models.Cart_detail,
        foreignKey: {
          name: 'cart_id',
          allowNull: false, 
          type: DataTypes.UUID
        },
        otherKey: {
          name: 'product_id',
          allowNull: false, 
          type: DataTypes.UUID
        }
      })

      this.belongsTo(models.User, {
        foreignKey: {
          name: 'user_id',
          allowNull: false,
          type: DataTypes.UUID
        }
      })
    }
  }
  Cart.init(
    {
      cart_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "User",
          key: "user_id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
