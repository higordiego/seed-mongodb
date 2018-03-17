module.exports = app => {
    const url = `${process.env.API_VERSION}/user`
    const Controller = require('../controllers/user')(app)
    const Validate = require('../validates/user')(app)

    app.route(url)
        .get(Controller.listAll)
        .post(Validate.create, Controller.create)

    app.route(`${url}/:_id`)
        .get(Validate.isId, Controller.listOne)
        .put(Validate.isId, Validate.update, Controller.update)
        .delete(Validate.isId, Controller.delete)
}
