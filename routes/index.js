import express from 'express';

const Router = express.Router();

Router.get('/status', (req, res) => {
  res.status(200).send('Running perfectly');
});

export default Router;
