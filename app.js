import express from "express";
import { Product, Category, Shop, registerModels } from "./models/index.js";
import Router from "./routes/index.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(Router);

const startServer = async () => {
  try {
    await registerModels();

    const product = await Product.findByPk(1);
    const shop = await Shop.findByPk(1);

    const r = await shop.addProduct(product, {
      through: { stock_quantity: 40 }
    });

    const shop_result = await Shop.findOne({
      where: { id: 1 },
      include: [
        {
          model: Product,
          through: { attributes: ["stock_quantity"] }
        }
      ]
    });

    console.log(shop_result.toJSON().Products);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error Staring server: ", error);
  }
};

startServer();
