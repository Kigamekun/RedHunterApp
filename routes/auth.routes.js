module.exports = (app) => {
    const auth = require('../app/controllers/auth.controller')
    const router = require('express').Router()


    router.get('/', auth.findAll)
    router.post('/login', auth.login)
    router.post('/register', auth.register)
    router.post('/logout', auth.logout)

    app.use('/api/auth', router)
}