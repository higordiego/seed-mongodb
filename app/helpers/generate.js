module.exports = ({
    token: (object) => {
        const jwt = require('jsonwebtoken')
        const key = process.env.TOKEN_SECRET
        const token = jwt.sign(object, key, {
            algorithm: 'HS256'
        })
        return token
    },
    active: () => {
        function digit4 () {
            return Math.floor((1 + Math.random()) * 0x10000)
        }
        return digit4() + digit4()
    }
})
