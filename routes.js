const express = require('express')
const mysql = require('mysql')
const router = express.Router()

router.get('/', (req, res) => {
      res.render('index')
})

router.post('/add_todo')