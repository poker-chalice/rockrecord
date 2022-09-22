const express = require('express')

const { body, validationResult } = require('express-validator')
const Result = require('../models/Result')
const { login } = require('../services/user')
const {
    PWD_SALT,
    PRIVATE_KEY,
    JWT_EXPIRED
} = require('../utils/constant')
const { md5, decode } = require('../utils')
const jwt = require('jsonwebtoken')
const jwtAuth = require('./jwt')

const router = express.Router()

router.use(jwtAuth)

router.post('/login',

    [
        body('username').isString().withMessage('username类型不正确'),
        body('password').isNumeric().withMessage('password类型不正确')
    ],
    function (req, res, next) {
        // console.log(req.body)
        // res.json({
        //     code: 0,
        //     msg: '登陆成功'
        // })
        const err = validationResult(req)
        console.log(err)
        if (!err.isEmpty()) {
            const [{ msg }] = err.errors
            next(boom.badRequest(msg))
        } else {
            let username = req.body.username
            const password = md5(`${req.body.password}${PWD_SALT}`)
            // querySql('select * from admin_user').then(results => {
            //     console.log(results)
            // }).catch(err => {
            //     console.log(err)
            // })
            login(username, password).then(user => {
                if (!user || user.length === 0) {
                    console.log(6666)
                    new Result('登陆失败').fail(res)
                } else {
                    console.log
                    const token = jwt.sign(
                        { username },
                        PRIVATE_KEY,
                        { expiresIn: JWT_EXPIRED }
                    )
                    new Result({ token }, '登陆成功').success(res)
                }
            })
        }
    }
)

router.get('/info', function (req, res, next) {
    res.json('user info...')
})

module.exports = router