const { querySql } = require('../db')

function login({ username, password }, next) {
    // const sql = `select * from admin_user where username='${username}' and password='${password}'`
    // return queryOne(sql, next)
    return querySql(`select * from admin_user where username='${username}' and password='${password}'`).then(results => {
        console.log(results)
    }).catch(err => {
        console.log(err)
    })
}

// function findUser({ username }, next) {
//     const sql = `select * from admin_user where username='${username}'`
//     return queryOne(sql, next)
// }


module.exports = {
    login,
    // findUser
}
