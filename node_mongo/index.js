const MongoClient = require('mongodb').MongoClient;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url).then((client) => {

  console.log('Connected correctly to server');

  const db = client.db(dbname);

  dboper.insertDocument(db, { name: 'Vadonut', description: 'test' }, 'dishes')
  .then((result) => {
    console.log('Insert document:\n', result.ops);

    return dboper.findDocuments(db, 'dishes')
  })
  .then((docs) => {
    console.log('Found documents:\n', docs);

    return dboper.updateDocument(db, {name: 'Vadonut'}, {description: 'Updated test'}, 'dishes')
  })
  .then((result) => {
      console.log('Updated document:\n', result.result);

      return dboper.findDocuments(db, 'dishes')
  })
  .then((docs) => {
    console.log('Found documents:\n', docs);

    return db.dropCollection('dishes')
  })
  .then((result) => {
    console.log('Dropped collection:\n', result);

    client.close();
  });
}) 
.catch((err) => console.log(err));

