module.exports = app => {
    const User = require('../models/user')
    const Errors = require('../../errors/authenticate/error')
    const Validate = require('../../helpers/validate')
    return {
        authenticate: (req, res, next) => {
            const required = ['email', 'password']
            const error = Validate.requestRequired(req, required, Errors)
            error ? res.status(400).json(error) : next()
        },
        isEmail: (req, res, next) =>
            Validate.searchQuery(User, {email: req.body.email})
                .then(model => !model ? res.status(400).json([Errors.emailOrPassword]) : next())
                .catch(err => res.status(500).json(err)),
        isActiveEmail: (req, res, next) =>
            Validate.searchQuery(User, {$and: [{email: req.body.email}, {active: null}]})
                .then(model => !model ? res.status(400).json([Errors.emailNotConfirm]) : next())
                .catch(err => res.status(500).json(err)),
        isActive: (req, res, next) =>
            Validate.searchQuery(User, {$and: [{email: req.body.email}, {status: false}]})
                .then(model => model ? res.status(400).json([Errors.notActive]) : next())
                .catch(err => res.status(500).json(err))
    }
}
