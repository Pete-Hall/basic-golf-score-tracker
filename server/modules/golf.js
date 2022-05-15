const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.post('/', (req, res)=>{
  console.log('in /golf POST:', req.body);
  // SQL query to send to the database to run
  const queryString = `INSERT INTO scores (date, course, par, front_nine, back_nine, total) VALUES ($1, $2, $3, $4, $5, $6);`; // sanitized values
  // values to send to the database to run in the query string
  const values = [req.body.date, req.body.course, req.body.par, req.body.frontNine, req.body.backNine, req.body.total];
  // sending the query and values to the database to add the inputted score
  pool.query(queryString, values).then((results)=>{
    res.sendStatus(201);
  }).catch((err)=>{
    console.log(err);
    res.sendStatus(500);
  })
})

router.get('/', (req, res)=>{ // http://localhost:5001/golf
  console.log('in /golf GET');
  // SQL query to send to the database to run
  const queryString = `SELECT * FROM scores;`;
  // sending the query string in the database to retrive the scores
  pool.query(queryString).then((result)=>{
    // send back the results from the query in the database
    res.send(result.rows);
  }).catch((err)=>{
    console.log(err);
    res.sendStatus(500);
  })
})

module.exports = router;