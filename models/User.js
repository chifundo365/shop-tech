import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

class User {
  static fields() {
    return {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },

      phone: {
        type: DataTypes.STRING(20),
        allowNull: false
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal(" CURRENT_TIMESTAMP()")
      },

      updated_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP()"),
        onUpdate: sequelize.literal("ON UPDATE CURRENT_TIMESTAMP()")
      }
    };
  }
}

export default User;
