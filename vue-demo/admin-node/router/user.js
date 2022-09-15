const express = require('express')
const jwt = require('jsonwebtoken')
const boom = require('boom')
const { body, validationResult } = require('express-validator')
const Result = require('../models/Result')
// const userService = require('../services/user')
const {
    PWD_SALT,
    PRIVATE_KEY,
    JWT_EXPIRED
} = require('../utils/constant')

const router = express.Router()

router.post('/login',
    [
        body('username').isString().withMessage('用户名必须为字符'),
        body('password').isString().withMessage('密码必须为字符'),
    ],
    function (req, res, next) {
        console.log(req.body)
        // res.json({
        //     code: 0,
        //     msg: '登陆成功'
        // })

        const err = validationResult(req)
        if (!err.isEmpty()) {
            const [{ msg }] = err.errors
            //自定义错误，表示参数异常
            next(boom.badRequest(msg))
        } else {
            let { username, password } = req.body
            login(username, password).then(user => {
                if (!user || user.length === 0) {
                    new Result('登陆失败').fail(res)
                } else {
                    new Result('登陆成功').success(res)
                }
            })
        }

    })

router.get('/info', function (req, res, next) {
    res.json('user info...')
})

module.exports = router