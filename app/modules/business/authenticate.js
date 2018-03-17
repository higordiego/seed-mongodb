module.exports = app => {
    const Generator = require('../../helpers/generate')
    const Errors = require('../../errors/system/error')
    const Users = app.datasource.models.User

    const isUpdate = (tokenGenerator, res) => (object) => (object[0])
        ? res.status(200).json({token: tokenGenerator})
        : res.status(400).json([Errors.dataProcessing])

    return {
        authenticate: (res) => (object) => {
            try {
                const payload = {_id: object.id, name: object.name, email: object.email}
                const tokenGenerator = Generator.token(payload)
                const query = {_id: object._id}
                const mod = {token: tokenGenerator}
                Users.update(mod, query)
                    .then(isUpdate(tokenGenerator, res))
                    .catch(() => res.status(400).json([Errors.dataProcessing]))
            } catch (err) {
                res.status(400).json([Errors.dataProcessing])
            }
        }
    }
}
