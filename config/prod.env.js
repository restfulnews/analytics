'use strict'
require('dotenv').config();

module.exports = {
  NODE_ENV: '"production"',
  API_URI: JSON.stringify(process.env.API_URI),
  DOMAIN: JSON.stringify(process.env.TLD),
  DODGY_TOKEN: JSON.stringify(process.env.DODGY_TOKEN),
}
