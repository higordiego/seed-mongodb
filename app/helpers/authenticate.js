const crypto = require('./crypto')

module.exports = ({
    authenticate: (User, Validate, Business, Errors) =>
        (req, res, next) => {
            const query = {
                $and:
                    [{
                        email: req.body.email.toLowerCase()
                    }, {
                        password: crypto.md5(req.body.password)
                    }, {
                        status: true
                    }]
            }
            Validate.searchQuery(User, query)
                .then(Validate.isEmptyObject(res, Errors.notAuthorization))
                .then(Business.authenticate(res))
                .catch(err => res.status(401).json([err]))
        }
})
