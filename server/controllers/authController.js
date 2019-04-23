const users = require('../models/users')
let id = 1

module.exports = {
    allUsers: (req, res) => {
        res.send(users)
    },
    login: (req, res) => {
        let {username, password} = req.body
        if(users.find((ele) => ele.username === username && ele.password === password)){
            req.session.user.username = username
            res.status(200).send(req.session.user)
        } else {
            res.status(500).send(':(')
        }
    },
    register: (req, res) => {
        let newUser = {id: id++, username: req.body.username, password: req.body.password}
        users.push(newUser)
        req.session.user.username = req.body.username
        res.status(200).send(req.session.user)
    },
    signOut: (req, res) => {
        req.session.destroy()
        res.status(200).send(req.session)
    },
    getUser: (req, res) => {
        res.status(200).send(req.session.user)
    }
}