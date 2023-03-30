const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Ge@8f3R',
  database: 'my_furnish',
});

module.exports = { connection };

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//   if (err) throw err;

//   console.log('The solution is: ', rows[0].solution);
// });

// connection.end();

/**=======
 * MongoDB 
======== */

// const mongoose = require('mongoose');

// async function connect() {
//   try {
//     await mongoose.connect('mongodb://127.0.0.1:27017/my_furnish', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Successfully connected to database');
//   } catch (error) {
//     console.log('Failed to connect to database');
//   }

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

// module.exports = { connect };
