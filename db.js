import mysql from 'mysql';

// Set up the database connection
const DBConnection = mysql.createConnection({
  host: 'localhost',
  database: 'cs_24_sw_2_13',
  user: 'cs-24-sw-2-13@student.aau.dk',
  password: '4zrwf9DxnSLRLV/+',
});

// Connect to the database
DBConnection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL', err);
      return;
    }
    console.log('MySQL connected');
  
    // Show all tables in the database
    DBConnection.query('SHOW TABLES', (err, tables) => {
      if (err) throw err;
  
      console.log('Available Tables:', tables);
  
      // If you want to show contents of a specific table
      // Let's say you want to check the first table's content
      const firstTableName = tables[0]['Tables_in_cs_24_sw_2_13']; // Use the correct key from the `tables` result
      DBConnection.query(`SELECT * FROM \`${firstTableName}\``, (err, results) => {
        if (err) throw err;
  
        console.log(`Contents of the table ${firstTableName}:`, results);
  
        // Don't forget to end the connection when you're done
        DBConnection.end();
      });
    });
    console.log('Tables:', tables);
  });