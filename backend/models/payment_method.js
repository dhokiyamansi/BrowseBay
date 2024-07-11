"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class payment_method extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Order,{
        foreignKey: {
          name: 'payment_method_id',
          allowNull: false,
          type: DataTypes.UUID
        }
      })
    }
  }
  payment_method.init(
    {
      payment_method_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "payment_method",
    }
  );
  return payment_method;
};
