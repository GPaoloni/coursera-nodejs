const express = require('express');
const bodyParser  = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

// /promotions router
promoRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req, res, next) => {
  res.end('Will send all the promos!');
})
.post((req, res, next) => {
  res.end('Will add promo: ' + req.body.name +
      ' with description ' + req.body.description);
})
.put((req, res, next) => {
  res.end('PUT operation not suported on /promos');
})
.delete((req, res, next) => {
  res.end('Deleting all the promos!');
})

// /promotions/:promoId router
promoRouter.route('/:promoId')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req, res, next) => {
  res.end('Will send details of the promo: ' + req.params.promoId);
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not suported on /promotions/' + req.params.promoId);
})
.put((req, res, next) => {
  res.write('Updating the promo: ' + req.params.promoId + '\n');
  res.end('Will update the promo: ' + req.body.name + 
      ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
  res.end('Deleting promo: ' + req.params.promoId); 
})

module.exports = promoRouter;