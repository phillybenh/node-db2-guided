const express = require('express');
const knex = require('knex');

////// Abstracted out Knex setup to dbConnection//////
const db = require('../data/dbConnection.js');

/*///// Setting up Knex //////
const knexFile = require('../knexfile')
// set up w/ environment variable for production vs/ development
const environment = process.send.NODE_ENV || "development";

// Usually abstracted out to a different file.
// the config has the properties you need to connect to SQLite DB. 
// const dbConfig = {
//   client: 'sqlite3', // driver
//   connection: {
//     filename: './data/produce.db3'
//   },
//   useNullAsDefault: true // for SQLite only
// };
const dbConfig = knexFile[environment];
const db = knex(dbConfig);
// //////^Setting up Knex^/////*/


const router = express.Router();

router.get('/', (req, res) => {
  db('fruits')
  .then(fruits => {
    res.json(fruits); 
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to retrieve fruits' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('fruits').where({ id }).first()
  .then(fruit => {
    res.json(fruit);
  }) 
  .catch (err => {
    res.status(500).json({ message: 'Failed to retrieve fruit' });
  });
});

router.post('/', (req, res) => {
  const fruitData = req.body;
  db('fruits').insert(fruitData)
  .then(ids => {
    db('fruits').where({ id: ids[0] })
    .then(newFruitEntry => {
      res.status(201).json(newFruitEntry);
    });
  })
  .catch (err => {
    console.log('POST error', err);
    res.status(500).json({ message: "Failed to store data" });
  });
});

module.exports = router;