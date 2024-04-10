import mysql from 'mysql';


const DBConnection = mysql.createConnection({
  host: 'localhost',
  database: 'cs_24_sw_2_13',
  user: 'cs-24-sw-2-13@student.aau.dk',
  password: '4zrwf9DxnSLRLV/+',
});


DBConnection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL', err);
    return;
  }
  console.log('MySQL is connected');


 
  DBConnection.query('SHOW TABLES', (err, results) => {
    if (err) {
      console.error('Error fetching tables', err);
      DBConnection.end();
      return;
    }

    
    if (results.length === 0) {
      console.log('No tables found.');
      DBConnection.end();
      return;
    }

    
    console.log('Available Tables:', results);

    results.forEach(row => {
     
      let tableName = row[`Tables_in_${DBConnection.config.database}`];

      DBConnection.query(`SELECT * FROM \`${tableName}\``, (err, tableResults) => {
        if (err) {
          console.error(`Error fetching data from table ${tableName}`, err);
          return;
        }
        console.log(`Contents of the table ${tableName}:`, tableResults);
      });
    });
  });
});