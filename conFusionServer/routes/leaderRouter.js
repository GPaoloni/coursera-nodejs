const express = require('express');
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');

const Leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

// /leaders router
leaderRouter.route('/')
.get((req, res, next) => {
  Leaders.find({})
  .then( leader => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(leader);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  Leaders.create(req.body)
  .then( leader => {
    console.log('Leader created: ' + leader);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(leader);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not suported on /leaders');
})
.delete((req, res, next) => {
  Leaders.deleteMany({})
  .then( response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(response);
  }, (err) => next(err))
  .catch((err) => next(err));
});

// /leaders/:leaderId router
leaderRouter.route('/:leaderId')
.get((req, res, next) => {
  Leaders.findById(req.params.leaderId)
  .then( (leader) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(leader);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not suported on /leader/' + req.params.leaderId);
})
.put((req, res, next) => {
  Leaders.findByIdAndUpdate(req.params.leaderId, {
    $set: req.body
  }, { new: true })
  .then( leader => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(leader)
  }, (err) => next(err))
  .catch((err) => next(err));
})
.delete((req, res, next) => {
  Leaders.findByIdAndRemove(req.params.leaderId)
  .then( response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(response);
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = leaderRouter;