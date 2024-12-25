import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/db.js';


const Shop = sequelize.define(
    'Shop',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      district: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,              
      },
    },
    {sequelize},
);

export { Shop };
