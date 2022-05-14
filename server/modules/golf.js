const express = require('express');
const router = express.Router();

let scores = [];

router.post('/', (req, res)=>{
  console.log('in /golf POST:', req.body);
  scores.push(req.body);
  res.sendStatus(201);
})

module.exports = router;