const pino = require('pino');
const pinoOptions = {
  level: 'info'
}
const inforPino = pino(
  pinoOptions,
  pino.destination('./logs/log1.json')
);

const expressPino = require('express-pino-logger')({
  logger: inforPino
});

module.exports = expressPino;