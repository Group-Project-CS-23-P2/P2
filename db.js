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



//Table creation function

  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS ratedActivitiestTable (
    User_id INT REFERENCES new_User_table(User_id),
    Football INT,
    Cheramic INT,
    Padeltennis INT,
    Running INT,
    Walking INT,
    PRIMARY KEY(User_id)
  )
`;

DBConnection.query(createTableQuery, (err, results) => {
  if (err) {
    console.error('Error creating ratedActivitiesTable', err);
    return;
  }
  console.log('ratedActivitiesTable created successfully or already exists');
  
});


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
  
  
 

  
//Activity insert 
  function insertIntoTable(Activity_id, Activity_name, Physical_rank, Creative_rank, Brainy_rank, Social_rank, Competative_rank, Pricepoint) {
    const query = 'INSERT INTO `new_Activity_table` (`Activity_id`, `Activity_name`, `Physical_rank`,`Creative_rank`,`Brainy_rank`,`Social_rank`,`Competative_rank`, `Pricepoint`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    DBConnection.query(query, [Activity_id, Activity_name, Physical_rank, Creative_rank, Brainy_rank, Social_rank, Competative_rank, Pricepoint], (err, results) => {
      if (err) {
        console.error('Error inserting data into table', err);
        return;
      }
      console.log('Data inserted successfully:', results);
    });
  }
  */
/*
  insertIntoTable(3, 'Padeltennis', 4, 2, 1, 3, 4, 150);
  insertIntoTable(4, 'Running', 5, 1, 1, 2, 2, 0);
  insertIntoTable(5, 'Walking', 2, 1, 2, 3, 1, 0);
*/
 

  
  //Denne funktion bruges til at fjerne tables!!!

  DBConnection.query('DROP TABLE ratedactivities_table', (err) => {
    if (err) {
      console.error('Error dropping ratedactivities_table', err);
      return;
    }
    console.log('ratedactivities_table dropped successfully');
  });
  



//User insert 
function insertIntoTable(User_id, Activity_1_rating, Activity_2_rating, Activity_3_rating, Activity_4_rating, Activity_5_rating) {
  const query = 'INSERT INTO `ratedactivities_table` (`User_id`, `Activity_1_rating`, `Activity_2_rating`, `Activity_3_rating`,`Activity_4_rating`,`Activity_5_rating`) VALUES (?, ?, ?, ?, ?, ?)';
  DBConnection.query(query, [User_id, Activity_1_rating, Activity_2_rating, Activity_3_rating, Activity_4_rating, Activity_5_rating], (err, results) => {
    if (err) {
      console.error('Error inserting data into table', err);
      return;
    }
    console.log('Data inserted successfully:', results);
  });
}





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
