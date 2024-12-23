import express from 'express';
import AppController from '../controllers/index.js';

const Router = express.Router();

Router.get('/status', AppController.getStatus);

export default Router;
