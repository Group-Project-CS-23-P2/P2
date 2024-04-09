import mysql from 'mysql';

// Set up the database connection
const DBConnection = mysql.createConnection({
  host: 'localhost',
  database: 'cs_24_sw_2_13',
  user: 'cs-24-sw-2-13@student.aau.dk',
  password: '4zrwf9DxnSLRLV/+',
});

// Connect to the database
DBConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySql', err);
    return;
  }
  console.log('MySQL connected');

  // Check if the table exists and create it if not
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS your_actual_table_name (
      column1 INT PRIMARY KEY AUTO_INCREMENT,
      column2 VARCHAR(255)
      -- Add other columns as necessary
    );
  `;

  DBConnection.query(createTableQuery, (error, results) => {
    if (error) {
      console.error('Error ensuring table existence:', error);
      return;
    }
    console.log('Table checked/created successfully');

    // Now, insert data
    const insertQuery = 'INSERT INTO your_actual_table_name (column2) VALUES (?);';
    const values = ['value1']; // Replace with actual values you wish to insert

    DBConnection.query(insertQuery, values, (error, result) => {
      if (error) {
        console.error('Error inserting data:', error);
        return;
      }
      console.log('Data inserted', result.insertId);
    });
  });
});
