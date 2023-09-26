const mysql = require('mysql');

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'assignproject'
})

con.connect(err =>{
    if (err) {
        throw err 
    }
    console.log('connected to mysql')
})

module.exports.con = con