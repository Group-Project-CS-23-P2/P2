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

export function createUser(userInfo)
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
    insertIntoTable(results.insertId, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1);
  });

 
}

//CreateUser(userInfotest8);

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

/**
 *
 *
 * @export
 * @param {string} username
 * @returns {User} User object from database
 */
export function userInfo(username){
    const query = `SELECT * FROM new_User_table WHERE Username = ? LIMIT 1`;

    DBConnection.query(query, [username], (err, results) => {
        if (err) {
          console.log('Error fetching user from new_User_table', err);
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

export async function activityInfo(Activity_name) {
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



export async function GetAllActivities(){
  let activitives = ['Football', 'Cheramic', 'Padeltennis', 'Running', 'Walking', `Bowling`, `Cooking_class`, `Crossfit`, `Yoga`, `Wellness`, `Swim`, `Museum`, `Board_game`, `Book_club`, `Listen_music`, `Concert`, `Create_song`, `Beachvolley`, `Paint`, `Gaming`];
  let i = 0; 
  let activityclasses = [];
  for (i; i < activitives.length-1; i++){
    activityclasses.push(await activityInfo(activitives[i]));
  }
  return activityclasses;
}

export async function getRatedActivities(Username) {
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
      const activities = ['Football', 'Cheramic', 'Padeltennis', 'Running', 'Walking', `Bowling`, `Cooking_class`, `Crossfit`, `Yoga`, `Wellness`, `Swim`, `Museum`, `Board_game`, `Book_club`, `Listen_music`, `Concert`, `Create_song`, `Beachvolley`, `Paint`, `Gaming`];  
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

/*
getRatedActivities("mebj").then(activities => {
  console.log(activities); 
}).catch(error => {
  console.error("Error fetching activities:", error);
});

getRatedActivities("finaltest").then(activities => {
  console.log(activities); 
}).catch(error => {
  console.error("Error fetching activities:", error);
});
*/

class RatedActivity {
    constructor(name, id, listofFeatures, rating)
    {
        this.name = name;
        this.id = id;
        this.listofFeatures = listofFeatures;
        this.rating = rating;
    }
  }
