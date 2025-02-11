import "dotenv/config";
console.log(process.env.DB_NAME);
import express from "express";
import { Product, Category, Shop, registerModels } from "./models/index.js";
import Router from "./routes/index.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/", Router);

const startServer = async () => {
  try {
    await registerModels();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error Staring server: ", error);
  }
};

startServer();
