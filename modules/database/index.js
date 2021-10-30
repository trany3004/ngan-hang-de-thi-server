const mongoose = require('mongoose')

const host = process.env.DB_HOST || '127.0.0.1'
console.log(`host: ${host}`)
const port = process.env.DB_PORT || '27017'
console.log(`port: ${port}`)
const dbName = process.env.DB_NAME || 'mydb'
console.log(`db: ${dbName}`)
const dbUri = process.env.DB_URI
console.log(`dbUri: ${dbUri}`)
const uri = `mongodb://${host}:${port}/${dbName}`;

console.log(`uri: ${uri}`)
const connectDB = () => {
    mongoose.connect(uri, { useNewUrlParser: true })
    mongoose.Promise = global.Promise
    mongoose.set('useFindAndModify', false)
}
module.exports = { connectDB }
