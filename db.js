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
//Table creation function

  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS new_User_table (
    User_id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Age INT,
    Physical INT,
    Creative INT,
    Brainy INT,
    Social INT,
    Competative INT,
    Pricepoint INT
  )
`;

DBConnection.query(createTableQuery, (err, results) => {
  if (err) {
    console.error('Error creating new_User_table', err);
    return;
  }
  console.log('new_User_table created successfully or already exists');
  
});
*/

/*
//User insert 
  function insertIntoTable(User_id, Username, Password, Age, Physical, Creative, Brainy, Social, Competative, Pricepoint) {
    const query = 'INSERT INTO `new_User_table` (`User_id`, `Username`, `Password`,`Age`,`Physical`,`Creative`,`Brainy`, `Social`, `Competative`, `Pricepoint`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    DBConnection.query(query, [User_id, Username, Password, Age, Physical, Creative, Brainy, Social, Competative, Pricepoint], (err, results) => {
      if (err) {
        console.error('Error inserting data into table', err);
        return;
      }
      console.log('Data inserted successfully:', results);
    });
  }

  insertIntoTable(1, 'Admin', `Password`, 22, 5, 3, 5, 4, 5, 300);
  
  */
 

  /*
//Activity insert 
  function insertIntoTable(Activity_id, Activity_name, Physical_rank, Creative_rank, Brainy_rank, Social_rank, Competative_rank, Pricepoint) {
    const query = 'INSERT INTO `new_User_table` (Activity_id`, `Activity_name`, `Physical_rank`,`Creative_rank`,`Brainy_rank`,`Social_rank`,`Competative_rank`, `Pricepoint`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    DBConnection.query(query, [Activity_id, Activity_name, Physical_rank, Creative_rank, Brainy_rank, Social_rank, Competative_rank, Pricepoint], (err, results) => {
      if (err) {
        console.error('Error inserting data into table', err);
        return;
      }
      console.log('Data inserted successfully:', results);
    });
  }

  insertIntoTable(1, 'Admin', `Password`, 22, 5, 3, 5, 4, 5, 300);
  
  */
 

  /*
  //Denne funktion bruges til at fjerne tables!!!

  DBConnection.query('DROP TABLE Activity_table', (err) => {
    if (err) {
      console.error('Error dropping Activity_table', err);
      return;
    }
    console.log('Activity_table dropped successfully');
  });
  
*/


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
