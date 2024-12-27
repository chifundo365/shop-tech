import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/db.js";
import Product from "./Product.js";
import Agent from "./Agent.js";

class Order extends Model {};

Order.init(
    {
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        customer_phone: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },

        quantity: {
            type: DataTypes.INTEGER,
            alloNull: false,
        },

        notes: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize,
        tableName: 'orders',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
);

Order.belongsTo(Product, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
});

Order.belongsTo(Agent, {
    foreignKey: 'agent_id',
    onDelete: 'SET NULL',
});

Product.hasMany(Order, {foreignKey: 'product_id'});
Agent.hasMany(Order, { foreignKey: 'agent_id'});

export default Order;