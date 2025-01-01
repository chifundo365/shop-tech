import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/db.js";
import Category from "./Category.js";

class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT
    },

    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id"
      }
    },

    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    stock_quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

Product.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Product, { foreignKey: "category_id" });

export default Product;
