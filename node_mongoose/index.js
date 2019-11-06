const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected correctly to the server');


  // let newDish = Dishes({
  //   name: 'Uthappizza',
  //   description: 'test',
  // })

  // newDish.save()
  Dishes.create({
    name: 'Uthappizza',
    description: 'test',
  })
  .then( (dish) => {
    console.log(dish);

    return Dishes.find({}).exec();
  })
  .then( (dishes) => {
    console.log(dishes);

    return Dishes.deleteMany({})
  })
  .then( (result) => {
    console.log('DeleteMany result: ', result);

    return mongoose.connection.close();
  })
  .catch( (err) => {
    console.log(err);
  });
});