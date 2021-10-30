module.exports = {
  port: {
    http: process.env.PORT || 3000
  },

  
  log: {
    dir: 'logs',
    filename: process.env.LOG_FILE_NAME || 'events.log',
    size: process.env.LOG_FILE_SIZE || 10485760,
    level: process.env.LOG_LEVEL || 'debug' // trace > debug > info > warn > error > fatal
  },
  jwt: {
    secrectKey : 'randomkey',
    expiresInMinutes: process.env.JWT_TIMEOUT || (3 * 30 * 24 * 60), // 8 hours in minutes
    algorithm: 'HS256'
  },
  secret: process.env.SECRET || 'This1s4Rand0m', // use to encrypt user password
  strapi: {
    endpoint: process.env.STRAPI_URL || 'http://103.101.163.72:1337',
    token: process.env.STRAPI_TOKEN || `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNGRlZWFlNjVkZmFkMDBhZjZlMjg1YSIsImlhdCI6MTYxNzA5Mzk4NCwiZXhwIjoxNjE5Njg1OTg0fQ.vkpAG2wIc4k9_oF8U81lVJJUY8DSk6KBBZnkYycvypo`
  }
}
