import express from 'express';
import router from './routes/index.js';
import { syncDatabase } from './utils/db.js';


const app = express();
const port = process.env.PORT || 5000;

app.use(router);



const startServer = async () => {
  try {
    await syncDatabase();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error Staring server: ', error);
  }
}


startServer();
