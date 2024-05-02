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
    Bowling INT,
    Cooking_class INT,
    Crossfit INT,
    Yoga INT,
    Wellness INT,
    Swim INT,
    Museum INT,
    Board_game INT,
    Book_club INT, 
    Listen_music INT, 
    Concert INT,
    Create_song INT,
    Beachvolley INT,
    Paint INT,
    Gaming INT,
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
/*
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
  
  insertIntoTable(1, 'Football', 5, 2, 1, 4, 5, 0);
  insertIntoTable(2, 'Cheramic', 1, 5, 3, 4, 1, 300);
  insertIntoTable(3, 'Padeltennis', 4, 2, 2, 4, 5, 150);
  insertIntoTable(4, 'Running', 4, 1, 1, 3, 2, 0);
  insertIntoTable(5, 'Walking', 2, 2, 2, 4, 1, 0);
  insertIntoTable(6, 'Bowling', 2, 2, 1, 3, 4, 150);
  insertIntoTable(7, 'Cooking_class', 1, 3, 3, 2, 1, 150);
  insertIntoTable(8, 'Crossfit', 5, 1, 1, 2, 2, 150);
  insertIntoTable(9, 'Yoga', 4, 1, 2, 3, 1, 150);
  insertIntoTable(10, 'Wellness', 1, 1, 1, 2, 1, 150);
  insertIntoTable(11, 'Swim', 5, 1, 1, 2, 3, 150);
  insertIntoTable(12, 'Museum', 1, 4, 4, 2, 1, 150);
  insertIntoTable(13, 'Board_game', 1, 3, 5, 4, 4, 0);
  insertIntoTable(14, 'Book_club', 1, 3, 3, 1, 1, 0);
  insertIntoTable(15, 'Listen_music', 1, 2, 2, 1, 1, 0);
  insertIntoTable(16, 'Concert', 1, 2, 2, 4, 1, 300);
  insertIntoTable(17, 'Create_song', 1, 4, 4, 2, 2, 0);
  insertIntoTable(18, 'Beachvolley', 4, 2, 1, 5, 5, 0);
  insertIntoTable(19, 'Paint', 1, 5, 3, 1, 1, 150);
  insertIntoTable(20, 'Gaming', 1, 4, 3, 2, 4, 0);
 
*/
  
  //Denne funktion bruges til at fjerne tables!!!
/*
  DBConnection.query('DROP TABLE ratedActivitiestTable', (err) => {
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


function deletefromactivityTable(Activity_id) {
  const query = 'DELETE FROM new_Activity_table WHERE Activity_id = ?';
  DBConnection.query(query, [Activity_id], (err, results) => {
    if (err) {
      console.error('Error inserting data into table', err);
      return;
    }
    console.log('');
  });
}

function deleteallactivities(){
  let length = 21; 
  for(let i = 0; i<length; i++){
    deletefromactivityTable(i);
  }
}
//deleteallactivities();

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




function insertIntoTable(User_id, Football, Cheramic, Padeltennis, Running, Walking, Bowling, Cooking_class, Crossfit, Yoga, Wellness, Swim, Museum, Board_game, Book_club, Listen_music, Concert, Create_song, Beachvolley, Paint, Gaming) {
  const query = 'INSERT INTO `ratedActivitiestTable` (`User_id`, `Football`, `Cheramic`, `Padeltennis`,`Running`, `Walking`, `Bowling`, `Cooking_class`, `Crossfit`, `Yoga`, `Wellness`, `Swim`, `Museum`, `Board_game`, `Book_club`, `Listen_music`, `Concert`, `Create_song`, `Beachvolley`, `Paint`, `Gaming`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  DBConnection.query(query, [User_id, Football, Cheramic, Padeltennis, Running, Walking, Bowling, Cooking_class, Crossfit, Yoga, Wellness, Swim, Museum, Board_game, Book_club, Listen_music, Concert, Create_song, Beachvolley, Paint, Gaming], (err, results) => {
    if (err) {
      console.error('Error inserting data into table', err);
      return;
    }
    console.log('Data inserted successfully:', results);
  });
}

function CreateUser(userInfo)
{
    const query = `
    INSERT INTO new_User_table
    (Username, Password, Age, Physical, Creative, Brainy, Social, Competative, Pricepoint)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;



  const values = [
    userInfo.Username,
    userInfo.Password, 
    userInfo.Age,
    userInfo.Physical,
    userInfo.Creative,
    userInfo.Brainy,
    userInfo.Social,
    userInfo.Competative,
    userInfo.Pricepoint
  ];
  
  
  
  DBConnection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting data into new_User_table', err);
      return;
    }
    console.log('New user created successfully:', results);
    insertIntoTable(results.insertId, 3, 2, 3, 3, 2, 1, 4, 5, 6, 4, 3, 2, 1, 3, 4, -1, -1, 4, 5, 1);
  });

 
}

const userInfotest10 = {
  Username: "Anton",
  Password: "lalal",
  Age: 26,
  Physical: 3,
  Creative: 4,
  Brainy: 1,
  Social: 5,
  Competative: 5,
  Pricepoint: 150
}

CreateUser(userInfotest10);

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
