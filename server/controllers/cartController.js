const swag = require('../models/swag')

module.exports = {
    add: (req, res) => {
        const targetSwag = swag.findIndex(ele => ele.id === +req.params.id)
        if(req.session.user.cart.includes(swag[targetSwag])){
            res.status(200).send(req.session.user)
        } else {
            console.log('ping from add to cart')
            let newItem = swag.find((ele) => ele.id === +req.params.id)
            req.session.user.cart.push(newItem)
            req.session.user.total += +newItem.price
            res.status(200).send(req.session.user)
        }
    },
    delete: (req, res) => {
        let deleteIndex = req.session.user.cart.findIndex(ele => ele.id === +req.params.id)
        if(deleteIndex !== -1){
            req.session.user.total -= req.session.user.cart[deleteIndex].price
            req.session.user.cart.splice(deleteIndex, 1)
            res.status(200).send(req.session.user)
        } else {
            res.status(200).send(req.session.user)
        }
    },
    checkout: (req, res) => {
        req.session.user.total = 0
        req.session.user.cart = []
        res.status(200).send(req.session.user)
    }
}