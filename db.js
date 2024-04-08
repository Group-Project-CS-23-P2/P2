import mysql from "mysql";

const DBConnection = mysql.createConnection({
    host     : 'localhost',
    database : 'cs_24_sw_2_13',
    user     : 'cs-24-sw-2-13@student.aau.dk',
    password : '4zrwf9DxnSLRLV/+'

});
DBConnection.connect((err) =>{
    if(err) throw err;
    console.log('MySql connected');
});
