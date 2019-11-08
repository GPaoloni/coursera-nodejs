const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

// /dishes router
dishRouter.route('/')
.get((req, res, next) => {
  Dishes.find({})
  .then( (dishes) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(dishes);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  Dishes.create(req.body)
  .then( (dish) => {
    console.log('Dish created: ', dish);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(dish);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not suported on /dishes');
})
.delete((req, res, next) => {
  Dishes.deleteMany({})
  .then( (response) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(response);
  }, (err) => next(err))
  .catch((err) => next(err));
});

// /dishes/:dishId router
dishRouter.route('/:dishId')
.get((req, res, next) => {
  Dishes.findById(req.params.dishId)
  .then( (dish) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(dish);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not suported on /dishes/' + req.params.dishId);
})
.put((req, res, next) => {
  Dishes.findByIdAndUpdate(req.params.dishId, {
    $set: req.body
  }, { new: true })
  .then( (dish) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(dish)
  }, (err) => next(err))
  .catch((err) => next(err));
})
.delete((req, res, next) => {
  Dishes.findByIdAndRemove(req.params.dishId)
  .then( (response) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(response);
  }, (err) => next(err))
  .catch((err) => next(err));
});

// /dishes/:dishId/comments router
dishRouter.route('/:dishId/comments')
.get((req, res, next) => {
  Dishes.findById(req.params.dishId)
  .then( (dish) => {
    if (dish !== null) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'aplication/json');
      res.json(dish.comments);
    } else {
      const err = new Error('Dish ' + req.params.dishId + ' not found :(');
      err.status = 404;
      return next(err);
    }
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  Dishes.findById(req.params.dishId)
  .then( (dish) => {
    if (dish !== null) {
      dish.comments.push(req.body);
      dish.save()
      .then( (dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'aplication/json');
        res.json(dish.comments);
      }, (err) => next(err))
    } else {
      const err = new Error('Dish ' + req.params.dishId + ' not found :(');
      err.status = 404;
      return next(err);
    }
  }, (err) => next(err))
  .catch((err) => next(err));
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not suported on /dishes');
})
.delete((req, res, next) => {
  Dishes.findById(req.params.dishId)
  .then( (dish) => {
    if (dish !== null) {
      for (let i = dish.comments.length-1 ; i >= 0 ; i--) {
        dish.comments.id(dish.comments[i]._id).deleteOne();
      }
      dish.save()
      .then( (dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'aplication/json');
        res.json(dish.comments);
      }, (err) => next(err))
    } else {
      const err = new Error('Dish ' + req.params.dishId + ' not found :(');
      err.status = 404;
      return next(err);
    }
  }, (err) => next(err))
  .catch((err) => next(err));
});

// /dishes/:dishId/comments/:commentId router
dishRouter.route('/:dishId/comments/:commentId')
.get((req, res, next) => {
  Dishes.findById(req.params.dishId)
  .then( (dish) => {
    if (dish !== null && dish.comments.id(req.params.commentId) !== null) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'aplication/json');
      res.json(dish.comments.id(req.params.commentId));
    } else if (dish === null) {
      const err = new Error('Dish ' + req.params.dishId + ' not found :(');
      err.status = 404;
      return next(err);
    } else {
      const err = new Error('Comment ' + req.params.commentId + ' not found :(');
      err.status = 404;
      return next(err);
    } 
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not suported on /dishes/' + req.params.dishId
    + '/comments/' + req.params.commentId);
})
.put((req, res, next) => {
  Dishes.findById(req.params.dishId)
  .then( (dish) => {
    if (dish !== null && dish.comments.id(req.params.commentId) !== null) {
      if (req.body.rating) {
        dish.comments.id(req.params.commentId).rating = req.body.rating;
      }
      if (req.body.comment) {
        dish.comments.id(req.params.commentId).comment = req.body.comment;
      }
      dish.save()
      .then( (dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'aplication/json');
        res.json(dish.comments.id(req.params.commentId));
      }, (err) => next(err))
    } else if (dish === null) {
      const err = new Error('Dish ' + req.params.dishId + ' not found :(');
      err.status = 404;
      return next(err);
    } else {
      const err = new Error('Comment ' + req.params.commentId + ' not found :(');
      err.status = 404;
      return next(err);
    } 
  }, (err) => next(err))
  .catch((err) => next(err));
})
.delete((req, res, next) => {
  Dishes.findById(req.params.dishId)
  .then( (dish) => {
    if (dish !== null && dish.comments.id(req.params.commentId) !== null) {
      dish.comments.id(req.params.commentId).deleteOne();
      dish.save()
      .then( (dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'aplication/json');
        res.json(dish);
      }, (err) => next(err))
    } else {
      const err = new Error('Dish ' + req.params.dishId + ' not found :(');
      err.status = 404;
      return next(err);
    }
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = dishRouter;