module.exports = app => {
    const User = require('../models/user')
    const Persistence = require('../../helpers/persistence')(User)
    const Business = require('../business/user')(app)
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'email', 'phone', 'password', 'gcm')(body)
                Business.create(body)
                .then(Persistence.create(res))
                .catch(err => res.status(500).json(err)),
        },
        update: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'email','gcm', 'password')(body)
                Business.update(res)
                    .then(Persistence.update(res)(req.params))
                    .catch(err => res.status(500).json(err))
        },
        listAll: (req, res) => Persistence.findAll(res)(req.params, req.body),
        listOne: (req, res) => Persistence.findOne(res)(req.params, req.body),
        delete: (req, res) => Persistence.remove(res)(req.params)
    }
}
