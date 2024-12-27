import { DataTypes } from "sequelize";

class User {
  static fields() {
    return {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }

    }
  }
}


export default User;
