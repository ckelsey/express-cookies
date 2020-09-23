const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const http = require('http')

const sessionConfig = {
    resave: false,
    saveUninitialized: false,
    rolling: true,
    secret: '3e8qCp0ttM3W7xxw8ZqG9ruh67gVEzpTp1NdX81A',
    defaultDevicesLimit: 6,
    limitOneSession: true,
    cookie: {
        maxAge: 60000 * 20,
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    }
}

const app = express()

app.use(cookieParser())
app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res) => {
    res.json({ hi: 'hello' })
})

const httpServer = http.createServer(app)
const server = httpServer.listen(8181)

process.on('SIGTERM', () => {
    server.close()
    process.exit()
})

module.exports = app