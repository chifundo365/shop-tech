import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/db.js';


class User extends Model {};

User.init(
  {
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

  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;
