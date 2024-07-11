"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // one to many relationship
      this.belongsTo(models.payment_method, {
        foreignKey: {
          name: 'payment_method_id',
          allowNull: false,
          type: DataTypes.UUID
        }
      })

      // many to many relationship
      this.belongsToMany(models.Product, {
        through: models.Order_detail,
        foreignKey: {
          name: 'order_id',
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

      this.belongsTo(models.Address, {
        foreignKey: {
          name: 'address_id',
          allowNull: false,
          type: DataTypes.UUID
        }
      })
    }
  }
  Order.init(
    {
      order_id: {
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
      address_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "Address",
          key: "address_id",
        },
        onDelete: "CASCADE",
      },
      payment_method_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "payment_method",
          key: "payment_method_id",
        },
      },
      total_amount: {
        allowNull: false,
        type: DataTypes.DECIMAL,
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
