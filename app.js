import express from 'express';
import { registerModels } from './models/index.js';
import Router from './routes/index.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(Router);



const startServer = async () => {
  try {
    //await registerModels();
    console.log("All models were succesfully connected");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error Staring server: ', error);
  }
}


startServer();
