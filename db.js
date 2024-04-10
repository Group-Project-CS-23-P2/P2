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



  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS User_table (
    column1 INT AUTO_INCREMENT PRIMARY KEY,
    column2 VARCHAR(255) NOT NULL
  )
`;

DBConnection.query(createTableQuery, (err, results) => {
  if (err) {
    console.error('Error creating User_table', err);
    return;
  }
  console.log('User_table created successfully or already exists');
  // Now you can proceed to insert data or perform other operations on the table
});


  function insertIntoTable(column1Value, column2Value) {
    const query = 'INSERT INTO `User_table` (`column1`, `column2`) VALUES (?, ?)';
    DBConnection.query(query, [column1Value, column2Value], (err, results) => {
      if (err) {
        console.error('Error inserting data into table', err);
        return;
      }
      console.log('Data inserted successfully:', results);
    });
  }

  insertIntoTable(20, 'TestValue');
  
 
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