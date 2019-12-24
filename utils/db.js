const Sequelize = require('sequelize');
const redis = require('redis');
const bluebird = require("bluebird");



const sequelize = new Sequelize('postgres://postgres:123qwe@localhost:5432/postgres', {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true
  }
});

/*
const sequelize = new Sequelize('postgres', 'postgres', '123qwe', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false,
});
*/

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const client = redis.createClient();


export default {
  Sequelize,
  sequelize,
  client
}
