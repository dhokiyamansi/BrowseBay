"use strict";
const { Model } = require("sequelize");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // get auth token for user
    genAuthToken() {
      const token = jwt.sign(
        { user_id: this.user_id, is_admin: this.is_admin },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
      );
      return token;
    }

    // hide few propertie
    toJSON() {
      const user = this.get({ plain: true });

      delete user.password_hash;
      delete user.is_logged_in;

      return user;
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // one to one relationship
      this.hasOne(models.Cart, {
        foreignKey: {
          name: "user_id",
          allowNull: false,
          type: DataTypes.UUID,
        },
      });

      // one to many relationships
      this.hasMany(models.Address, {
        foreignKey: {
          name: "user_id",
          allowNull: false,
          type: DataTypes.UUID,
        },
      });

      this.hasMany(models.Order, {
        foreignKey: {
          name: "user_id",
          allowNull: false,
          type: DataTypes.UUID,
        },
      });
    }
  }
  User.init(
    {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
        // set() {
        //   this.setDataValue("name", this.getDataValue("name").trim());
        // },
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        // set() {
        //   this.setDataValue("email", this.getDataValue("email").trim().toLowerCase());
        // },
      },
      password_hash: {
        allowNull: false,
        type: DataTypes.STRING,
        set(value) {
          let plain_pw = value;
          let hashed_pw = brcypt.hashSync(plain_pw, 10);
          this.setDataValue("password_hash", hashed_pw);
        },
      },
      phone_number: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(15),
      },
      is_admin: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_logged_in: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
