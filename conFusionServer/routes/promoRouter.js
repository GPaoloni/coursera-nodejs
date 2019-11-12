const express = require('express');
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');

const authenticate = require('../authenticate');

const Promotions = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

// /promotions router
promoRouter.route('/')
.get((req, res, next) => {
  Promotions.find({})
  .then( promotions => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(promotions);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
  Promotions.create(req.body)
  .then( promotion => {
    console.log('Promotion created: ' + promotion);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(promotion);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.put(authenticate.verifyUser, (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not suported on /promos');
})
.delete(authenticate.verifyUser, (req, res, next) => {
  Promotions.deleteMany({})
  .then( response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(response);
  }, (err) => next(err))
  .catch((err) => next(err));
});

// /promotions/:promoId router
promoRouter.route('/:promoId')
.get((req, res, next) => {
  Promotions.findById(req.params.promoId)
  .then( (promotion) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(promotion);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not suported on /promotions/' + req.params.promoId);
})
.put(authenticate.verifyUser, (req, res, next) => {
  Promotions.findByIdAndUpdate(req.params.promoId, {
    $set: req.body
  }, { new: true })
  .then( promotion => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(promotion)
  }, (err) => next(err))
  .catch((err) => next(err));
})
.delete(authenticate.verifyUser, (req, res, next) => {
  Promotions.findByIdAndRemove(req.params.promoId)
  .then( response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(response);
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = promoRouter;