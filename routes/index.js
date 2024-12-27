import express from 'express';
import AppController from '../controllers/AppController.js';
import ShopRoutes from '../routes/shop.js'

const Router = express.Router();

Router.use('/shops', ShopRoutes);

Router.get('/status', AppController.getStatus);


export default Router;
