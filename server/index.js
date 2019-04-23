require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const checkSession = require('./middlewares/checkForSession')
const swagCtrl = require('./controllers/swagController')
const authCtrl = require('./controllers/authController')
const cartCtrl = require('./controllers/cartController')
const searchCtrl = require('./controllers/searchController')

const {SERVER_PORT, SESSION_SECRET} = process.env

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkSession)
app.use(express.static(`${__dirname}/../build`))


app.listen(SERVER_PORT, () => {
    console.log('listening on ', SERVER_PORT)
})

app.get('/api/swag', swagCtrl.getSwag)

app.post('/api/login', authCtrl.login)

app.post('/api/register', authCtrl.register)

app.post('/api/signout', authCtrl.signOut)

app.get('/api/user', authCtrl.getUser)

app.get('/api/allusers', authCtrl.allUsers)

app.post('/api/cart/checkout', cartCtrl.checkout)

app.post('/api/cart/:id', cartCtrl.add)

app.delete('/api/cart/:id', cartCtrl.delete)

app.get('/api/search', searchCtrl.search)
