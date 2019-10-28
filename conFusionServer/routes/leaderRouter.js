const express = require('express');
const bodyParser  = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

// /leaders router
leaderRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req, res, next) => {
  res.end('Will send all the leaders!');
})
.post((req, res, next) => {
  res.end('Will add leader: ' + req.body.name +
      ' with description ' + req.body.description);
})
.put((req, res, next) => {
  res.end('PUT operation not suported on /leaders');
})
.delete((req, res, next) => {
  res.end('Deleting all the leaders!');
})

// /leaders/:leaderId router
leaderRouter.route('/:leaderId')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req, res, next) => {
  res.end('Will send details of the leader: ' + req.params.leaderId);
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not suported on /leaders/' + req.params.leaderId);
})
.put((req, res, next) => {
  res.write('Updating the leader: ' + req.params.leaderId + '\n');
  res.end('Will update the leader: ' + req.body.name + 
      ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
  res.end('Deleting leader: ' + req.params.leaderId); 
})

module.exports = leaderRouter;