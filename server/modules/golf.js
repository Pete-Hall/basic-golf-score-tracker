const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.post('/', (req, res)=>{
  console.log('in /golf POST:', req.body);
  const queryString = `INSERT INTO scores (date, course, par, front_nine, back_nine, total) VALUES ($1, $2, $3, $4, $5, $6);`;
  const values = [req.body.date, req.body.course, req.body.par, req.body.frontNine, req.body.backNine, req.body.total];
  pool.query(queryString, values).then((results)=>{
    res.sendStatus(201);
  }).catch((err)=>{
    console.log(err);
    res.sendStatus(500);
  })
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