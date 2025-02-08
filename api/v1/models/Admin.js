import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/db.js";
import User from "./User.js";
import Shop from "./Shop.js";

class Admin extends Model {}

Admin.init(
  {
    ...User.fields(),
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Shop,
        key: "id"
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "admin",
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false
  }
);

Admin.belongsTo(Shop, { foreignKey: "shop_id" });
Shop.hasMany(Admin, { foreignKey: "shop_id" });

export default Admin;
