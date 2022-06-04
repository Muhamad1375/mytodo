const express = require('express')
const mysql = require('mysql')
const router = express.Router()


function getConnection() {
  return mysql.createConnection({
      host: "localhost",
      port: "3306",
      user: "root",
      password: "password",
      database: "todo"
  })
}

const con = getConnection()

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/get_todos', (req, res) => {
  const queryString = "SELECT * FROM todos WHERE compelete = '0'"
  con.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query at /get_todo: " + err)
    }
    console.log("Getting data from database at /get_todos")
    res.json(rows)
  })
})


router.post('/add_todo', (req, res) => {
  const todo = req.body.add_todo_input

  const queryString = "INSERT INTO todos (todo) VALUES (?)"
  con.query(queryString, [todo], (err, rows, fields) => {
    if (err) {
      console.log("Failed to insert at /add_todo/: " + todo + " " +
      err)
    }
    console.log("@/add_todo todos : " + todo + " added.")
    res.redirect('/')
  })
})

router.post('/compelete_todo/:id', (req,res) => {
      const todo_id = req.params.id
      const queryString = "UPDATE todos SET compelete = '1' WHERE todo_id = ?"
      con.query(queryString, [todo_id], (err, rows, fields) => {
            if (err) {
                  console.log("Failed to compelete @ /compelete_todo: " + todo_id + " " + err )
            }
            console.log("@/compelete_todo/ completing todo with id " + todo_id)
            res.redirect('/')
      }) 
})

module.exports = router