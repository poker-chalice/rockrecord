const express = require('express')
// const logger = require('morgan')
const router = require('./router/index.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const https = require('https')
const fs = require('fs')
// const init = require('./utils/init')

// init()
const app = express()

app.use(cors())
// app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', router)

const server = app.listen(8089, function () {
    const host = server.address().address
    const port = server.address().port

    console.log('HTTP Server is running on http://%s:%s', host, port)
})
const privateKey = fs.readFileSync('./https/rockrecord.website.key', 'utf8')
const certificate = fs.readFileSync('./https/rockrecord.website.pem', 'utf8')
const credentials = { key: privateKey, cert: certificate }
const httpsServer = https.createServer(credentials, app)
const SSLPORT = 8090
httpsServer.listen(SSLPORT, function () {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT)
})