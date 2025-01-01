import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/db.js";
import Product from "./Product.js";

class ProductImage extends Model {}

ProductImage.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id"
      }
    },

    image_url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "product_images",
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

ProductImage.belongsTo(Product, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
Product.hasMany(ProductImage, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

export default ProductImage;
