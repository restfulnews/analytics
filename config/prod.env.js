'use strict'
require('dotenv').config();

module.exports = {
  NODE_ENV: '"production"',
  API_URI: JSON.stringify(process.env.API_URI),
}
