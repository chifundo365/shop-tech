import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/db.js";
import User from "./User.js";
import Admin from "./Admin.js";

class Agent extends Model {}

Agent.init(
  {
    ...User.fields(),

    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admin,
        key: "id"
      }
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: "agent",
      allowNull: false
    },

    residence: {
      type: DataTypes.STRING,
      allowNull: false
    },

    district: {
      type: DataTypes.STRING,
      allowNull: false
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false
  }
);

Agent.belongsTo(Admin, { foreignKey: "admin_id" });
Admin.hasOne(Agent, { foreignKey: "admin_id" });

export default Agent;
