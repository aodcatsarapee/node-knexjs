const env = {
  database: 'accesscontrol',
  username: 'root',
  password: '',
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  SECRETKEY: 'accesscontrol'
};

module.exports = env;

// const env = {
//   database: 'heroku_7b447c9ff43cafd',
//   username: 'b301256d5c59b7',
//   password: '8c0eae8d',
//   host: 'us-cdbr-east-05.cleardb.net',
//   dialect: 'mysql',
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
//   SECRETKEY: 'accesscontrol'
// };

// module.exports = env;