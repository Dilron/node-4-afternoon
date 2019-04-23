const swag = require('../models/swag')

module.exports = {
    getSwag: (req, res) => {
        res.status(200).send(swag)
    }
}