import express from 'express'
import mysql from 'mysql2'
const app = express();

//mysql setting
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'docker',
  password: 'docker',
  database: 'test'
});

connection.connect();

//cors setting
//app.use((req, res, next) => {
//  res.header("Access-Control-Allow-Origin", "*")
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")//
//  next()
// })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const query = `SELECT table_name FROM information_schema.tables WHERE table_name IN ('users', 'murmurs', 'followers', 'likes');`
// const query = `SELECT * from users`;
// const query = `INSERT INTO murmurs (user_id, description) VALUES ((SELECT id FROM users WHERE name = 'shateel' LIMIT 1), 'Murmur 2')`
// const query = `
//   select * from murmurs;
// `
// Get example
const router: express.Router = express.Router()
router.get('/api/getTest', (req, res) => {
  connection.query(query, function (err, results, fields) {
    if (err) throw err
    res.send(results)
  });
  // res.send(req.query)
})

//Post example
router.post('/api/postTest', (req, res) => {
  // connection.query('select * from test', function (err, results, fields) {
  connection.query(query, function (err, results, fields) {
    if (err) throw err
    res.send(results)
  });
})

app.use(router)

app.listen(8080, () => { console.log('Example app listening on port 8080!') })
