const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.post('/', (req, res)=>{
  console.log('in /golf POST:', req.body);
  scores.push(req.body);
  res.sendStatus(201);
})

router.get('/', (req, res)=>{
  console.log('in /golf GET');
  const queryString = `SELECT * FROM scores;`;
  pool.query(queryString).then((result)=>{
    res.send(result.rows);
  }).catch((err)=>{
    console.log(err);
    res.sendStatus(500);
  })
})

module.exports = router;