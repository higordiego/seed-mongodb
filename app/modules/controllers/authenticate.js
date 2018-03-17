module.exports = app => {
    const Errors = require('../../errors/system/error')
    const Validate = require('../../helpers/validate')
    const Help = require('../../helpers/authenticate')
    const User = require('../models/user')
    const Persistence = require('../../helpers/persistence')(User)
    const Business = require('../business/authenticate')(app)

    return {
        authenticate: Help.authenticate(User, Validate, Business, Errors),
        logout: (req, res) =>
            Persistence.update({
                $and: [
                    {_id: req.user._id},
                    {email: req.user.email}
                ]
            }, res)({token: null}),
        me: (req, res) =>
            Persistence.findOne({
                $and: [
                    {id: req.user.id},
                    {token: req.user.token}
                ]
            }, res)
    }
}
