import express from 'express'
import mysql from 'mysql2'
import bcrypt from 'bcrypt'
import crypto, { verify } from 'crypto'
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
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")//
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
app.use(router)

router.get('/api/getTest', async (req, res) => {
  return res.send(req.query)
  // const hashedPassword = await bcrypt.hash('321', 10)
  // return res.send(`${hashedPassword}`)
  // let query = `UPDATE users SET password = '${hashedPassword}';`
  // let query = `SELECT * FROM users`
  // let query = `SELECT COUNT(DISTINCT(token)) AS count FROM users`
  // let query = `ALTER TABLE users ADD UNIQUE (email);`
  // let query = `ALTER TABLE users ADD UNIQUE (token);`
  // let query = `ALTER TABLE users DROP INDEX email_2;`
  // let query = `SHOW INDEXES IN users`
  // let query = `ALTER TABLE murmurs ADD created_at DATETIME, ADD updated_at DATETIME`
  // let query = `UPDATE murmurs SET created_at = '2020-12-05', updated_at = '2020-12-05'`
  // let query = `ALTER TABLE likes ADD created_at DATETIME, ADD updated_at DATETIME`
  // let query = `UPDATE likes SET created_at = '2020-12-05', updated_at = '2020-12-05'`
  // let query = `ALTER TABLE followers ADD created_at DATETIME, ADD updated_at DATETIME`
  // let query = `UPDATE followers SET created_at = '2020-12-05', updated_at = '2020-12-05'`
  // connection.query(query, function (err, results, fields) {
  //   if (err) throw err
  //   return res.send(results)
  // });
  // for (let i = 1; i <= 11; i++) {
  //   let token = crypto.randomBytes(64).toString('hex')
  //   let query = `UPDATE users SET token = '${token}' WHERE id = ${i}`;
  //   connection.query(query, function (err, results, fields) {
  //     if (err) throw err
  //   });
  // }
  // return res.send(`Tokens set successfully!`)
})

//Post example
router.post('/api/postTest', (req, res) => {
  connection.query('select * from users', function (err, results, fields) {
  // connection.query(query, function (err, results, fields) {
    if (err) throw err
    return res.send(results)
  });
})

router.get('/api/tables', (req, res) => {
  let query = `SELECT table_name FROM information_schema.tables WHERE table_name IN ('users', 'murmurs', 'followers', 'likes');`
  connection.query(query, function (err, results, fields) {
    if (err) throw err
    return res.send(results)
  });
})
interface User {
  id: number,
  name: string,
  email: string,
  password: string,
  token: string
}
interface Murmur {
  id: number,
  user_id: number,
  description: string
}
router.get('/api/users/seed', (req, res) => {
  for (let i = 1; i <= 10; i++) {
    let query = `INSERT INTO users (name, email) VALUES ('user${i}', 'user${i}@mail.com')`;
    connection.query(query, function (err, results, fields) {
      if (err) throw err
    });
  }
  return res.send(`Users seeded successfully!`)
})
router.post('/api/users/register', async (req, res) => {
  let user = {
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    token: crypto.randomBytes(64).toString('hex')
  }
  // return res.send(user)
  // return res.status(500).send('something went wrong')
  let query = `
    INSERT INTO users (name, email, password, token)
    VALUES (?, ?, ?, ?)
  `
  let userArray = [user.name, user.email, user.password, user.token];
  connection.query(query, userArray, function (err, results, fields) {
    if (err) {
      // return res.status(500).send(err)
      return res.status(500).send('Something went wrong! Please try again.')
    } else {
      return res.status(201).send('User registration successful. Please login.')  
    }
  });
})
router.post('/api/users/login', async (req, res) => {
  let query = `
    SELECT
      id,
      name,
      email,
      password,
      token
    FROM
      users
    WHERE
      email = ?
  `
  connection.query(query, [req.body.email], async function (err, results, fields) {
    if (err) throw err
    let resultArray: Array<object> = Object.values(JSON.parse(JSON.stringify(results)))
    if (resultArray.length <= 0) {
      return res.status(404).send('User not found!')
    }
    
    let user = resultArray[0] as User
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        user.password = ''
        return res.send(user)
      } else {
        return res.status(401).send('Unauthorized')
      }
    } catch {
      return res.status(500).send()
    }
    // return res.send(user)
  });
})
router.get('/api/murmurs/delete', (req, res) => {
  let deleteMurmursQuery = `DELETE FROM murmurs;`
  connection.query(deleteMurmursQuery, function (err, results, fields) {
    if (err) throw err
    return res.send(results)
  });
})
router.get('/api/murmurs/seed', (req, res) => {
  for (let i = 1; i <= 11; i++) {
    for (let j = 1; j <= 15; j++) {
      let murmurQuery = `INSERT INTO murmurs (user_id, description) VALUES (${i}, 'Murmur ${j} of user ${i}')`;
      connection.query(murmurQuery, function (err, results, fields) {
        if (err) throw err
      });
    }
  }
  return res.send(`Murmurs seeded successfully!`)
})
function verifyToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  if (token == null) {
    return res.sendStatus(401)
  }
  let query = `
    SELECT
      id,
      name,
      email,
      token,
      (
        SELECT  COUNT(*)
        FROM    murmurs
        WHERE   murmurs.user_id = users.id
      ) AS murmurs,
      (
        SELECT  COUNT(*)
        FROM    followers
        WHERE   followers.user_id = users.id
      ) AS followers,
      (
        SELECT  COUNT(*)
        FROM    followers
        WHERE   followers.follower_id = users.id
      ) AS follows
    FROM
      users
    WHERE
    token = ?
  `
  connection.query(query, [token], function (err, results, fields) {
    if (err) throw err
    let resultArray: Array<object> = Object.values(JSON.parse(JSON.stringify(results)))
    if (resultArray.length === 0) {
      return res.sendStatus(401)
    }
    let user = resultArray[0] as User
    req.user = user
    next()
  });

}
router.get('/api/users/me', verifyToken, (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  let query = `
    SELECT
      id,
      name,
      email,
      token,
      (
        SELECT  COUNT(*)
        FROM    murmurs
        WHERE   murmurs.user_id = users.id
      ) AS murmurs,
      (
        SELECT  COUNT(*)
        FROM    followers
        WHERE   followers.user_id = users.id
      ) AS followers,
      (
        SELECT  COUNT(*)
        FROM    followers
        WHERE   followers.follower_id = users.id
      ) AS follows
    FROM
      users
    WHERE
    token = ?
  `
  connection.query(query, [token], function (err, results, fields) {
    if (err) throw err
    let resultArray: Array<object> = Object.values(JSON.parse(JSON.stringify(results)))
    let user: object = resultArray[0]
    return res.send(user)
  });
})
router.get('/api/users', (req, res) => {
  let query = `
    SELECT
      id,
      name,
      email,
      (
        SELECT  COUNT(*)
        FROM    murmurs
        WHERE   murmurs.user_id = users.id
      ) AS murmurs,
      (
        SELECT  COUNT(*)
        FROM    followers
        WHERE   followers.user_id = users.id
      ) AS followers,
      (
        SELECT  COUNT(*)
        FROM    followers
        WHERE   followers.follower_id = users.id
      ) AS follows
    FROM
      users;
  `
  connection.query(query, function (err, results, fields) {
    if (err) throw err
    return res.send(results)
  });
})
router.get('/api/users/:id', (req, res) => {
  let query = `
    SELECT
      id,
      name,
      email,
      (
        SELECT  COUNT(*)
        FROM    murmurs
        WHERE   murmurs.user_id = users.id
      ) AS murmurs,
      (
        SELECT  COUNT(*)
        FROM    followers
        WHERE   followers.user_id = users.id
      ) AS followers,
      (
        SELECT  COUNT(*)
        FROM    followers
        WHERE   followers.follower_id = users.id
      ) AS follows
    FROM
      users
    WHERE
      id = ?
  `
  connection.query(query, [req.params.id], function (err, results, fields) {
    if (err) throw err
    let resultArray: Array<object> = Object.values(JSON.parse(JSON.stringify(results)))
    let user: object = resultArray[0]
    return res.send(user)
  });
})
function getuserByToken(token: string) {
  if (token == '' || token == null || token == undefined) {
    return false
  }
  let query = `
    SELECT
      id,
      name,
      email,
      password,
      token
    FROM
      users
    WHERE
      token = ?
  `
  let user = {} as User;
  connection.query(query, [token], async function (err, results, fields) {
    if (err) throw err
    let resultArray: Array<object> = Object.values(JSON.parse(JSON.stringify(results)))
    user = resultArray[0] as User
    return user
  });
}
router.post('/api/murmurs/save', verifyToken, (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  let query = `
    SELECT
      id,
      name,
      email,
      password,
      token
    FROM
      users
    WHERE
      token = ?
  `
  connection.query(query, [token], function (err, results, fields) {
    if (err) {
      // throw err
      return res.status(500).send('Somethin went wrong!')
    }
    let resultArray: Array<object> = Object.values(JSON.parse(JSON.stringify(results)))
    let user = resultArray[0] as User
    // return res.send(user)
    query = ` INSERT INTO murmurs (user_id, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())`
    connection.query(query, [user.id, req.body.description], function (err, results, fields) {
      if (err) {
        // throw err
        // return res.status(500).send('Somethin went wrong!')
      }
      return res.status(201).send('Murmur posted successfully.')
    });
  });
})
router.get('/api/murmurs', (req, res) => {
  let query = `
    SELECT
      id,
      user_id,
      (
        SELECT  name
        FROM    users
        WHERE   users.id = murmurs.user_id
      ) AS user_name,
      description,
      (
        SELECT  COUNT(*)
        FROM    likes
        WHERE   likes.murmur_id = murmurs.id
      ) AS likes,
      created_at,
      updated_at
    FROM
      murmurs
    ORDER BY
      updated_at DESC
  `
  connection.query(query, function (err, results, fields) {
    if (err) throw err
    return res.send(results)
  });
})
router.get('/api/murmurs/:id', (req, res) => {
  let query = `
    SELECT
      id,
      user_id,
      (
        SELECT  name
        FROM    users
        WHERE   users.id = murmurs.user_id
      ) AS user_name,
      description,
      (
        SELECT  COUNT(*)
        FROM    likes
        WHERE   likes.murmur_id = murmurs.id
      ) AS likes,
      created_at,
      updated_at
    FROM
      murmurs
    WHERE
      id = ?
    ORDER BY
      updated_at DESC
  `
  connection.query(query, [req.params.id], function (err, results, fields) {
    if (err) throw err
    let resultArray: Array<object> = Object.values(JSON.parse(JSON.stringify(results)))
    let murmur: object = resultArray[0]
    return res.send(murmur)
  });
})
// async function user_liked_murmur(user_id: number, murmur_id: number): boolean {
//   let query = `SELECT * FROM likes WHERE user_id = ? AND murmur_id = ?`;
//   let [err, rows, fields] = await connection.query(query, [user_id, murmur_id], function (err, results, fields) {
//     if (err) {
//       // throw err
//       return false
//     }
//     let resultArray: Array<object> = Object.values(JSON.parse(JSON.stringify(results)))
//     if (resultArray.length === 0) {
//       return false
//     }
//     return true
//   })
//   return false
// }
router.post('/api/murmurs/:id/like', verifyToken, (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  let query = `
    SELECT
      id,
      name,
      email,
      password,
      token
    FROM
      users
    WHERE
      token = ?
  `
  connection.query(query, [token], function (err, results, fields) {
    if (err) {
      // throw err
      return res.status(500).send('Somethin went wrong!')
    }
    let resultArray: Array<object> = Object.values(JSON.parse(JSON.stringify(results)))
    let user = resultArray[0] as User
    // return res.send(user)
    query = `SELECT id, user_id, description FROM murmurs WHERE id = ?`
    connection.query(query, [req.params.id], function (err, results, fields) {
      if (err) {
        // throw err
        return res.status(500).send('Somethin went wrong!')
      }
      
      resultArray = Object.values(JSON.parse(JSON.stringify(results)))
      if (resultArray.length === 0) {
        return res.status(404).send('Murmur not found!')
      }
      let murmur = resultArray[0] as Murmur
      if (murmur.user_id == user.id) {
        return res.status(422).send('A user cannot like their own murmur')
      }
      let query = `SELECT * FROM likes WHERE user_id = ? AND murmur_id = ?`;
      connection.query(query, [user.id, murmur.id], function (err, results, fields) {
        if (err) {
          // throw err
          return res.status(500).send('Somethin went wrong!')
        }
        resultArray = Object.values(JSON.parse(JSON.stringify(results)))
        if (resultArray.length > 0) {
          return res.status(422).send('User already liked this murmur')
        }
        query = `INSERT INTO likes (user_id, murmur_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())`
        connection.query(query, [user.id, murmur.id], function (err, results, fields) {
          if (err) {
            // throw err
            return res.status(500).send('Somethin went wrong!')
          }
          return res.status(200).send('Murmur liked successfully.')
        });
      })
    });
  });
})
router.post('/api/murmurs/:id/unlike', verifyToken, (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  let query = `
    SELECT
      id,
      name,
      email,
      password,
      token
    FROM
      users
    WHERE
      token = ?
  `
  connection.query(query, [token], function (err, results, fields) {
    if (err) {
      // throw err
      return res.status(500).send('Somethin went wrong!')
    }
    let resultArray: Array<object> = Object.values(JSON.parse(JSON.stringify(results)))
    let user = resultArray[0] as User
    // return res.send(user)
    query = `SELECT id, user_id, description FROM murmurs WHERE id = ?`
    connection.query(query, [req.params.id], function (err, results, fields) {
      if (err) {
        // throw err
        return res.status(500).send('Somethin went wrong!')
      }
      
      resultArray = Object.values(JSON.parse(JSON.stringify(results)))
      if (resultArray.length === 0) {
        return res.status(404).send('Murmur not found!')
      }
      let murmur = resultArray[0] as Murmur
      let query = `SELECT * FROM likes WHERE user_id = ? AND murmur_id = ?`;
      connection.query(query, [user.id, murmur.id], function (err, results, fields) {
        if (err) {
          // throw err
          return res.status(500).send('Somethin went wrong!')
        }
        resultArray = Object.values(JSON.parse(JSON.stringify(results)))
        if (resultArray.length === 0) {
          return res.status(422).send('User has not liked this murmur!')
        }
        query = `DELETE FROM likes WHERE user_id = ? AND murmur_id = ?`
        connection.query(query, [user.id, murmur.id], function (err, results, fields) {
          if (err) {
            // throw err
            return res.status(500).send('Somethin went wrong!')
          }
          return res.status(200).send('Murmur unliked successfully.')
        });
      })
    });
  });
})
router.post('/api/murmurs/:id/delete', verifyToken, (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  let query = `
    SELECT
      id,
      name,
      email,
      password,
      token
    FROM
      users
    WHERE
      token = ?
  `
  connection.query(query, [token], function (err, results, fields) {
    if (err) {
      // throw err
      return res.status(500).send('Somethin went wrong!')
    }
    let resultArray: Array<object> = Object.values(JSON.parse(JSON.stringify(results)))
    let user = resultArray[0] as User
    // return res.send(user)
    query = `SELECT id, user_id, description FROM murmurs WHERE id = ?`
    connection.query(query, [req.params.id], function (err, results, fields) {
      if (err) {
        // throw err
        return res.status(500).send('Somethin went wrong!')
      }
      
      resultArray = Object.values(JSON.parse(JSON.stringify(results)))
      if (resultArray.length === 0) {
        return res.status(404).send('Murmur not found!')
      }
      let murmur = resultArray[0] as Murmur
      if (murmur.user_id != user.id) {
        return res.status(401).send('Unauthorized')
      }
      query = `DELETE FROM murmurs WHERE id = ?`
      connection.query(query, [murmur.id], function (err, results, fields) {
        if (err) {
          // throw err
          return res.status(500).send('Somethin went wrong!')
        }
        return res.status(200).send('Murmur deleted successfully.')
      });
    });
  });
})
router.get('/api/users/me/murmurs', verifyToken, (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  let query = `
    SELECT
      id,
      name,
      email,
      password,
      token
    FROM
      users
    WHERE
      token = ?
  `
  connection.query(query, [token], function (err, results, fields) {
    if (err) {
      // throw err
      return res.status(500).send('Somethin went wrong!')
    }
    let resultArray: Array<object> = Object.values(JSON.parse(JSON.stringify(results)))
    let user = resultArray[0] as User
    // return res.send(user)
    query = `
      SELECT
        id,
        user_id,
        (
          SELECT  name
          FROM    users
          WHERE   users.id = murmurs.user_id
        ) AS user_name,
        description,
        (
          SELECT  COUNT(*)
          FROM    likes
          WHERE   likes.murmur_id = murmurs.id
        ) AS likes,
        created_at,
        updated_at
      FROM
        murmurs
      WHERE
        user_id = ?
      ORDER BY
        updated_at DESC
    `
    connection.query(query, [user.id], function (err, results, fields) {
      if (err) {
        // throw err
        return res.status(500).send('Somethin went wrong!')
      }
      return res.send(results)
    });
  });
})
router.get('/api/users/:id/murmurs', (req, res) => {
  let query = `
    SELECT
      id,
      user_id,
      (
        SELECT  name
        FROM    users
        WHERE   users.id = murmurs.user_id
      ) AS user_name,
      description,
      (
        SELECT  COUNT(*)
        FROM    likes
        WHERE   likes.murmur_id = murmurs.id
      ) AS likes,
      created_at,
      updated_at
    FROM
      murmurs
    WHERE
      user_id = ?
    ORDER BY
      updated_at DESC
  `
  connection.query(query, [req.params.id], function (err, results, fields) {
    if (err) throw err
    return res.send(results)
  });
})
router.post('/api/users/:id/follow', verifyToken, (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  let query = `
    SELECT
      id,
      name,
      email,
      password,
      token
    FROM
      users
    WHERE
      token = ?
  `
  connection.query(query, [token], function (err, results, fields) {
    if (err) {
      // throw err
      return res.status(500).send('Somethin went wrong!')
    }
    let resultArray: Array<object> = Object.values(JSON.parse(JSON.stringify(results)))
    let follower = resultArray[0] as User
    // return res.send(user)
    query = `
      SELECT
        id,
        name,
        email,
        password,
        token
      FROM
        users
      WHERE
        id = ?
    `
    connection.query(query, [req.params.id], function (err, results, fields) {
      if (err) {
        // throw err
        return res.status(500).send('Somethin went wrong!')
      }
      
      resultArray = Object.values(JSON.parse(JSON.stringify(results)))
      if (resultArray.length === 0) {
        return res.status(404).send('User not found!')
      }
      let user = resultArray[0] as User
      if (user.id == follower.id) {
        return res.status(422).send('A user cannot follow themselves')
      }
      let query = `SELECT * FROM followers WHERE user_id = ? AND follower_id = ?`;
      connection.query(query, [user.id, follower.id], function (err, results, fields) {
        if (err) {
          // throw err
          return res.status(500).send('Somethin went wrong!')
        }
        resultArray = Object.values(JSON.parse(JSON.stringify(results)))
        if (resultArray.length > 0) {
          return res.status(422).send('Already followed!')
        }
        query = `INSERT INTO followers (user_id, follower_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())`
        connection.query(query, [user.id, follower.id], function (err, results, fields) {
          if (err) {
            // throw err
            return res.status(500).send('Somethin went wrong!')
          }
          return res.status(200).send('User followed successfully.')
        });
      })
    });
  });
})
router.post('/api/users/:id/unfollow', verifyToken, (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  let query = `
    SELECT
      id,
      name,
      email,
      password,
      token
    FROM
      users
    WHERE
      token = ?
  `
  connection.query(query, [token], function (err, results, fields) {
    if (err) {
      // throw err
      return res.status(500).send('Somethin went wrong!')
    }
    let resultArray: Array<object> = Object.values(JSON.parse(JSON.stringify(results)))
    let follower = resultArray[0] as User
    // return res.send(user)
    query = `
      SELECT
        id,
        name,
        email,
        password,
        token
      FROM
        users
      WHERE
        id = ?
    `
    connection.query(query, [req.params.id], function (err, results, fields) {
      if (err) {
        // throw err
        return res.status(500).send('Somethin went wrong!')
      }
      
      resultArray = Object.values(JSON.parse(JSON.stringify(results)))
      if (resultArray.length === 0) {
        return res.status(404).send('User not found!')
      }
      let user = resultArray[0] as User
      if (user.id == follower.id) {
        return res.status(422).send('A user cannot unfollow themselves')
      }
      let query = `SELECT * FROM followers WHERE user_id = ? AND follower_id = ?`;
      connection.query(query, [user.id, follower.id], function (err, results, fields) {
        if (err) {
          // throw err
          return res.status(500).send('Somethin went wrong!')
        }
        resultArray = Object.values(JSON.parse(JSON.stringify(results)))
        if (resultArray.length === 0) {
          return res.status(422).send('User has not followed the other other user!')
        }
        query = `DELETE FROM followers WHERE user_id = ? AND follower_id = ?`
        connection.query(query, [user.id, follower.id], function (err, results, fields) {
          if (err) {
            // throw err
            return res.status(500).send('Somethin went wrong!')
          }
          return res.status(200).send('User unfollowed successfully.')
        });
      })
    });
  });
})


const port = 8080;
app.listen(port, () => { console.log(`Example app listening on port ${port}!`) })
