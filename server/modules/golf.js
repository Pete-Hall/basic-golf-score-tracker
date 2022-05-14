const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

let scores = [];

router.post('/', (req, res)=>{
  console.log('in /golf POST:', req.body);
  scores.push(req.body);
  res.sendStatus(201);
})

router.get('/', (req, res)=>{
  console.log('in /golf GET');
  res.send(scores);
})

module.exports = router;