import mysql from "mysql";
const DBConnection = mysql.createConnection({
    host     : 'localhost',
    database : 'cs_24_sw_2_13',
    user     : 'cs-24-sw-2-13@student.aau.dk',
    password : '4zrwf9DxnSLRLV/+'
});

DBConnection.connect((err) =>{
    if(err) throw err;
    console.log('MySql connected');
});

const userInfotest1 = {
    Username: "amve",
    Password: "tintinitibet123",
    Age: 21,
    Physical: 5,
    Creative: 2,
    Brainy: 4,
    Social: 3,
    Competative: 5,
    Pricepoint: 300
}

const userInfotest5 = {
  Username: "test10",
  Password: "test2",
  Age: 21,
  Physical: 5,
  Creative: 5,
  Brainy: 5,
  Social: 5,
  Competative: 5,
  Pricepoint: 0
}


function insertIntoTable(User_id, Football, Cheramic, Padeltennis, Running, Walking) {
  const query = 'INSERT INTO `ratedActivitiestTable` (`User_id`, `Football`, `Cheramic`, `Padeltennis`,`Running`,`Walking`) VALUES (?, ?, ?, ?, ?, ?)';
  DBConnection.query(query, [User_id, Football, Cheramic, Padeltennis, Running, Walking], (err, results) => {
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
    
    insertIntoTable(userInfo.User_id, -1, -1, 1, -1, -1);
  });

 
}

CreateUser(userInfotest5);

function AddRating()
{
    //Sanitize Relevant JSON variables
}

function GroupQuery()
{
    //Sanitize Relevant JSON variables
}

class Activity {
    constructor(name, id, listofFeatures)
    {
        this.name = name;
        this.id = id;
        this.listofFeatures = listofFeatures;
    }
}

class User {
    constructor(name, id, listofFeatures)
    {
        this.name = name;
        this.id= id;
        this.listofFeatures = listofFeatures;
    }
}

function userInfo(username){
    const query = `SELECT * FROM new_User_table WHERE Username = ? LIMIT 1`;

    DBConnection.query(query, [username], (err, results) => {
        if (err) {
          console.error('Error fetching user from new_User_table', err);
          return null; 
        }
        if (results.length === 0) {
          console.log('User not found');
          return null; 
        }
    
        const userRow = results[0];
        const listofFeatures = [
          userRow.Physical,
          userRow.Creative,
          userRow.Brainy,
          userRow.Social,
          userRow.Competative,
          userRow.Pricepoint
        ];
    
        const user = new User(userRow.Username, userRow.User_id, listofFeatures);
    
        console.log(user);
        return user;
      });
}

function activityInfo(Activity_name) {
  return new Promise((resolve, reject) => {
      const query = `SELECT * FROM new_Activity_table WHERE Activity_name = ? LIMIT 1`;
      DBConnection.query(query, [Activity_name], (err, results) => {
          if (err) {
              console.error('Error fetching activity from new_Activity_table', err);
              reject(err);
          } else if (results.length === 0) {
              console.log('Activity not found');
              reject(new Error('Activity not found'));
          } else {
              const ActivityRow = results[0];
              const listofFeatures = [
                  ActivityRow.Physical_rank,
                  ActivityRow.Creative_rank,
                  ActivityRow.Brainy_rank,
                  ActivityRow.Social_rank,
                  ActivityRow.Competative_rank,
                  ActivityRow.Pricepoint
              ];
              const activity = new Activity(ActivityRow.Activity_name, ActivityRow.Activity_id, listofFeatures);
              resolve(activity);
          }
      });
  });
}


//activityInfo("Football");

//userInfo("amve");


async function getRatedActivities(Username) {
  try {
      const userResults = await new Promise((resolve, reject) => {
          const query = `SELECT * FROM new_User_table WHERE Username = ? LIMIT 1`;
          DBConnection.query(query, [Username], (err, results) => {
              if (err) reject(err);
              else if (results.length === 0) reject(new Error('User not found'));
              else resolve(results);
          });
      });

      let userid = userResults[0].User_id;

      const ratingsResults = await new Promise((resolve, reject) => {
          const query1 = `SELECT * FROM ratedActivitiestTable WHERE User_id = ? LIMIT 1`;
          DBConnection.query(query1, [userid], (err, results) => {
              if (err) reject(err);
              else if (results.length === 0) reject(new Error('Ratings not found'));
              else resolve(results);
          });
      });

      let listOfRatedActivities = [];
      const activities = ['Football', 'Cheramic', 'Padeltennis', 'Running', 'Walking'];  
      for (let activity of activities) {
          if (ratingsResults[0][activity] > 0) {
              let activityDetails = await activityInfo(activity);
              let ratedActivity = new RatedActivity(activity, activityDetails.id, activityDetails.listofFeatures, ratingsResults[0][activity]);
              listOfRatedActivities.push(ratedActivity);
          }
      }

      
      return listOfRatedActivities;
  } catch (error) {
      console.error("Error in getRatedActivities:", error);
      return []; 
  }
}


getRatedActivities("mebj").then(activities => {
  console.log(activities); 
}).catch(error => {
  console.error("Error fetching activities:", error);
});

getRatedActivities("test10").then(activities => {
  console.log(activities); 
}).catch(error => {
  console.error("Error fetching activities:", error);
});


class RatedActivity {
    constructor(name, id, listofFeatures, rating)
    {
        this.name = name;
        this.id = id;
        this.listofFeatures = listofFeatures;
        this.rating = rating;
    }
  }
