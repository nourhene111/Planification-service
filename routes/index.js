const express = require('express'); 

const planificationRouter = require('./planification.route');

function routerApi(app) {
  const router = express.Router();
  app.use('/api', router); 
  router.use('/planification', planificationRouter);
}

module.exports = routerApi;