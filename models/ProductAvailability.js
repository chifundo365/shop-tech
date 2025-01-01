import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/db.js";
import Product from "./Product.js";
import Shop from "./Shop.js";

class ProductAvailability extends Model {}

ProductAvailability.init(
  {
    stock_quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    tableName: "product_availability",
    timestamps: false
  }
);

Product.belongsToMany(Shop, {
  through: ProductAvailability,
  foreignKey: "product_id",
  otherKey: "shop_id"
});

Shop.belongsToMany(Product, {
  through: ProductAvailability,
  foreignKey: "shop_id",
  otherKey: "product_id"
});

ProductAvailability.belongsTo(Product, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

ProductAvailability.belongsTo(Shop, {
  foreignKey: "shop_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

export default ProductAvailability;
