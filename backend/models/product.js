"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // many to many relationships
      this.belongsToMany(models.Cart, {
        through: models.Cart_detail,
        foreignKey: {
          name: 'product_id',
          allowNull: false, 
          type: DataTypes.UUID
        },
        otherKey: {
          name: 'cart_id',
          allowNull: false, 
          type: DataTypes.UUID
        }
      })

      this.belongsToMany(models.Order, {
        through: models.Order_detail,
        foreignKey: {
          name: 'product_id',
          allowNull: false, 
          type: DataTypes.UUID
        },
        otherKey: {
          name: 'order_id',
          allowNull: false, 
          type: DataTypes.UUID
        }
      })

      this.belongsTo(models.Category, {
        foreignKey: {
          name: 'category_id',
          allowNull: false,
          type: DataTypes.UUID
        }
      })
    }
  }
  Product.init(
    {
      product_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },
      stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      image_url: {
        type: DataTypes.STRING,
      },
      category_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "Category",
          key: "category_id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
