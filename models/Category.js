import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/db.js";

class Category extends Model { };

Category.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
        }
    },

    { 
        sequelize,
        timestamps: false,
    },
);

export default Category;