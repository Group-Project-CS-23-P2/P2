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
/*
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
*/
/*
DBConnection.query(createTableQuery, (err, results) => {
  if (err) {
    console.error('Error creating ratedActivitiesTable', err);
    return;
  }
  console.log('ratedActivitiesTable created successfully or already exists');
  
});

*/

//User insert 
/*
  function insertUserIntoTable(User_id, Username, Password, Age, Physical, Creative, Brainy, Social, Competative, Pricepoint) {
    const query = 'INSERT INTO `new_User_table` (`User_id`, `Username`, `Password`,`Age`,`Physical`,`Creative`,`Brainy`, `Social`, `Competative`, `Pricepoint`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    DBConnection.query(query, [User_id, Username, Password, Age, Physical, Creative, Brainy, Social, Competative, Pricepoint], (err, results) => {
      if (err) {
        console.error('Error inserting data into table', err);
        return;
      }
      console.log('Data inserted successfully:', results);
    });
  }

  //insertIntoTable(1, 'Admin', `Password`, 22, 5, 3, 5, 4, 5, 300);
  
  */
 

  
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
  
/*
  insertIntoTable(6, 'Bowling', 2, 2, 1, 3, 4, 150);
  insertIntoTable(7, 'Cooking class', 1, 3, 3, 2, 1, 150);
  insertIntoTable(8, 'Crossfit', 5, 1, 1, 2, 2, 150);
  insertIntoTable(9, 'Yoga', 4, 1, 2, 3, 1, 150);
  insertIntoTable(10, 'Wellness', 1, 1, 1, 2, 1, 150);
  insertIntoTable(11, 'Swim', 5, 1, 1, 2, 3, 150);
  insertIntoTable(12, 'Museum', 1, 4, 4, 2, 1, 150);
  insertIntoTable(13, 'Board game', 1, 3, 5, 4, 4, 0);
  insertIntoTable(14, 'Read a book', 1, 3, 3, 1, 1, 0);
  insertIntoTable(15, 'Listen to music', 1, 2, 2, 1, 1, 0);
  insertIntoTable(16, 'Go to a concert', 1, 2, 2, 4, 1, 300);
  insertIntoTable(17, 'Make a song', 1, 4, 4, 2, 2, 0);
  insertIntoTable(18, 'Beachvolley', 4, 2, 1, 5, 5, 0);
  insertIntoTable(19, 'Paint', 1, 5, 3, 1, 1, 150);
  insertIntoTable(20, 'Play computer', 1, 4, 3, 2, 4, 0);
 */

  
  //Denne funktion bruges til at fjerne tables!!!
/*
  DBConnection.query('DROP TABLE ratedactivities_table', (err) => {
    if (err) {
      console.error('Error dropping ratedactivities_table', err);
      return;
    }
    console.log('ratedactivities_table dropped successfully');
  });
  
*/

/*
//User insert 
function insertRatedIntoTable(User_id, Football, Cheramic, Padeltennis, Running, Walking) {
  const query = 'INSERT INTO `ratedActivitiestTable` (`User_id`, `Football`, `Cheramic`, `Padeltennis`,`Running`,`Walking`) VALUES (?, ?, ?, ?, ?, ?)';
  DBConnection.query(query, [User_id, Football, Cheramic, Padeltennis, Running, Walking], (err, results) => {
    if (err) {
      console.error('Error inserting data into table', err);
      return;
    }
    console.log('Data inserted successfully:', results);
  });
}

//insertIntoTable(2, 5, -1, 4, 5, -1);

*/
//Helper function
function deletefromuserTable(User_id) {
  const query = 'DELETE FROM new_User_table WHERE User_id = ?';
  DBConnection.query(query, [User_id], (err, results) => {
    if (err) {
      console.error('Error inserting data into table', err);
      return;
    }
    console.log('');
  });
}

//Helper function
function deletefromratedTable(User_id) {
  const query = 'DELETE FROM ratedActivitiestTable WHERE User_id = ?';
  DBConnection.query(query, [User_id], (err, results) => {
    if (err) {
      console.error('Error inserting data into table', err);
      return;
    }
    console.log('User deleted');
  });
}

function deleteAllUsers(){
  let length = 0;
  for(let i = 0; i < length; i++){
    deletefromuserTable(i);
    deletefromratedTable(i);
  }
}

function deleteSinglePerson(user_id){
  deletefromuserTable(user_id);
  deletefromratedTable(user_id);
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
