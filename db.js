import mysql from "mysql";

const DBConnection = mysql.createConnection({
    host     : 'localhost',
    database : 'cs_24_sw_2_13',
    user     : 'cs-24-sw-2-13@student.aau.dk',
    password : '4zrwf9DxnSLRLV/+'

});
// Connect to the database
DBConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySql', err);
        return;
    }
    console.log('MySQL connected');
    
    // Insert data once connected
    const insertQuery = 'INSERT INTO your_table_name (column1, column2) VALUES (?, ?)';
    const values = ['value1', 'value2']; // Replace these with the values you wish to insert
    DBConnection.query(insertQuery, values, (error, result) => {
        if (error) {
            console.error('Error inserting data:', error);
            return;
        }
        console.log('Data inserted', result.insertId);
    });

    // Don't forget to close the connection when you're done
    // Especially important in scripts that exit after execution
    // DBConnection.end();
});