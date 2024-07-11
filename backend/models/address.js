"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: {
          name: "user_id",
          allowNull: false,
          type: DataTypes.UUID,
        },
      });

      // one to many relation
      this.hasMany(models.Order, {
        foreignKey: {
          name: "address_id",
          allowNull: false,
          type: DataTypes.UUID,
        },
      });
    }
  }
  Address.init(
    {
      address_id: {
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
      address_line1: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      address_line2: {
        type: DataTypes.STRING,
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      zip_code: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
      country: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
