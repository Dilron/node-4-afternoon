const swag = require('../models/swag')

module.exports = {
    search: (req, res) => {
        console.log(swag[0].category, req.query)
        if(swag.some(ele => ele.category === req.query.category)){
            let search = swag.filter(ele => ele.category === req.query.category)
            res.status(200).send(search)
        } else {
            res.status(200).send(swag)
        }
    }
}