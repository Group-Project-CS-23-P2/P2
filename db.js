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


  function insertData(table, data) {
    const placeholders = Object.keys(data).map(() => '?').join(',');
    const insertQuery = `INSERT INTO \`${table}\` (${Object.keys(data).join(',')}) VALUES (${placeholders})`;

    DBConnection.query(insertQuery, Object.values(data), (err, results) => {
      if (err) {
        console.error('Error inserting data', err);
        return;
      }
      console.log('Data inserted', results);
    });
  }

  // Inserting data example
  insertData('example_table', { data: 'Sample Data' });


  // Show all tables in the database
  DBConnection.query('SHOW TABLES', (err, results) => {
    if (err) {
      console.error('Error fetching tables', err);
      DBConnection.end();
      return;
    }

    // Check if there are any tables
    if (results.length === 0) {
      console.log('No tables found.');
      DBConnection.end();
      return;
    }

    // Log the list of tables
    console.log('Available Tables:', results);

    // To print the contents of each table (optional)
    results.forEach(row => {
      // The key for the table name depends on the result structure
      // This might need to be changed based on what SHOW TABLES returns
      let tableName = row[`Tables_in_${DBConnection.config.database}`];

      DBConnection.query(`SELECT * FROM \`${tableName}\``, (err, tableResults) => {
        if (err) {
          console.error(`Error fetching data from table ${tableName}`, err);
          return;
        }
        console.log(`Contents of the table ${tableName}:`, tableResults);
      });
    });

    // End the connection if you are not planning to do any more queries
    // DBConnection.end(); // Uncomment this line if you're done with all queries
  });
});