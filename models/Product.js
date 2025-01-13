import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/db.js";
import Category from "./Category.js";
import Admin from "./Admin.js";

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
    }
  },
  {
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

Product.belongsTo(Admin, { foreignKey: "admin_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Product, { foreignKey: "category_id" });

export default Product;
