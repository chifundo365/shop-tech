import express from 'express';
import AppController from '../controllers/index';

const Router = express.Router();

Router.get('/status', AppController.getStatus);

export default Router;