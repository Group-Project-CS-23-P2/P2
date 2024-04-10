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



/*
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS new_Activity_table (
    Activity_id INT AUTO_INCREMENT PRIMARY KEY,
    Activity_name VARCHAR(255) NOT NULL,
    Physical_rank INT,
    Creative_rank INT,
    Brainy_rank INT,
    Social_rank INT,
    Competative_rank INT,
    Pricepoint INT
  )
`;

DBConnection.query(createTableQuery, (err, results) => {
  if (err) {
    console.error('Error creating new_Activity_table', err);
    return;
  }
  console.log('new_Activity_table created successfully or already exists');
  
});

*/

  function insertIntoTable(column1Value, column2Value) {
    const query = 'INSERT INTO `new_Activity_table` (`Activity_id`, `Activity_name`, `Physical_rank`,`Creative_rank`,`Brainy_rank`,`Social_rank`,`Competative_rank`, `Pricepoint`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    DBConnection.query(query, [column1Value, column2Value, column3Value, column4Value, column5Value, column6Value, column7Value, column8Value], (err, results) => {
      if (err) {
        console.error('Error inserting data into table', err);
        return;
      }
      console.log('Data inserted successfully:', results);
    });
  }

  insertIntoTable(1, 'Football', 5, 1, 2, 4, 4, 0);
  
 
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
