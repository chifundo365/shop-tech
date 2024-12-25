import express from 'express';
import router from './routes/index.js';
import { sequelize } from './utils/db.js';
import { registerModels } from './models/index.js';
import { Shop } from './models/Shop.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(router);



const startServer = async () => {
  try {
    await registerModels();

    await sequelize.sync({alter: true});

    console.log("All models were succesfully connected");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error Staring server: ', error);
  }
}


startServer();
