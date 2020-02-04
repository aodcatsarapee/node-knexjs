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