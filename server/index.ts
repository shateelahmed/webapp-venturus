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
app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*")
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")//
 next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// const query = `SELECT * from users`;
// const query = `INSERT INTO murmurs (user_id, description) VALUES ((SELECT id FROM users WHERE name = 'shateel' LIMIT 1), 'Murmur 2')`
// const query = `
//   select * from murmurs;
// `
// Get example
const router: express.Router = express.Router()

router.get('/api/getTest', (req, res) => {
  res.send(`query: ${req.query}`)
})

//Post example
router.post('/api/postTest', (req, res) => {
  connection.query('select * from users', function (err, results, fields) {
  // connection.query(query, function (err, results, fields) {
    if (err) throw err
    res.send(results)
  });
})

router.get('/api/tables', (req, res) => {
  let query = `SELECT table_name FROM information_schema.tables WHERE table_name IN ('users', 'murmurs', 'followers', 'likes');`
  connection.query(query, function (err, results, fields) {
    if (err) throw err
    res.send(results)
  });
})
router.get('/api/users/seed', (req, res) => {
  for (let i = 1; i <= 10; i++) {
    let query = `INSERT INTO users (name, email) VALUES ('user${i}', 'user${i}@mail.com')`;
    connection.query(query, function (err, results, fields) {
      if (err) throw err
    });
  }
  res.send(`Users seeded successfully!`)
})
router.get('/api/murmurs/seed', (req, res) => {
  let usersQuery = `SELECT id FROM users;`
  connection.query(usersQuery, function (err, results, fields) {
    if (err) throw err
    let users = Object.values(JSON.parse(JSON.stringify(results)))
    for (let i = 0; i <= users.length; i++) {
      let user: any = users[i];
      for (let j = 1; j <= 10; j++) {
        let murmurQuery = `INSERT INTO murmurs (user_id, description) VALUES (${user.id}, 'Murmur ${j} of user ${user.id}')`;
        connection.query(murmurQuery, function (err, results, fields) {
          if (err) throw err
        });
      }
    }
  });
  res.send(`Murmurs seeded successfully!`)
})
router.get('/api/users', (req, res) => {
  let query = `SELECT id, name, email FROM users;`
  connection.query(query, function (err, results, fields) {
    if (err) throw err
    res.send(results)
  });
})
router.get('/api/users/:id', (req, res) => {
  let query = `SELECT id, name, email FROM users WHERE id = ?`
  connection.query(query, [req.params.id], function (err, results, fields) {
    if (err) throw err
    let resultArray: Array<object> = Object.values(JSON.parse(JSON.stringify(results)))
    let user: object = resultArray[0]
    res.send(user)
  });
})
router.get('/api/murmurs', (req, res) => {
  let query = `
    SELECT
      id,
      user_id,
      description,
      (
        SELECT  COUNT(*)
        FROM    likes
        WHERE   likes.murmur_id = murmurs.id
      ) AS likes
    FROM
      murmurs
  `
  connection.query(query, function (err, results, fields) {
    if (err) throw err
    res.send(results)
  });
})
router.get('/api/murmurs/:id', (req, res) => {
  let query = `
    SELECT
      id,
      user_id,
      description,
      (
        SELECT  COUNT(*)
        FROM    likes
        WHERE   likes.murmur_id = murmurs.id
      ) AS likes
    FROM
      murmurs
    WHERE
      id = ?
  `
  connection.query(query, [req.params.id], function (err, results, fields) {
    if (err) throw err
    let resultArray: Array<object> = Object.values(JSON.parse(JSON.stringify(results)))
    let murmur: object = resultArray[0]
    res.send(murmur)
  });
})
router.get('/api/users/:id/murmurs', (req, res) => {
  let query = `
    SELECT
      id,
      user_id,
      description,
      (
        SELECT  COUNT(*)
        FROM    likes
        WHERE   likes.murmur_id = murmurs.id
      ) AS likes
    FROM
      murmurs
    WHERE
      user_id = ?`
  connection.query(query, [req.params.id], function (err, results, fields) {
    if (err) throw err
    res.send(results)
  });
})

app.use(router)

const port = 8080;
app.listen(port, () => { console.log(`Example app listening on port ${port}!`) })
