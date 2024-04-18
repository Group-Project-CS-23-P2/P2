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
    
  });
}


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

function activityInfo(Activity_name){
    const query = `SELECT * FROM new_Activity_table WHERE Activity_name = ? LIMIT 1`;

    DBConnection.query(query, [Activity_name], (err, results) => {
        if (err) {
          console.error('Error fetching user from new_Activity_table', err);
          return null; 
        }
        if (results.length === 0) {
          console.log('Activity not found');
          return null; 
        }
    
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
    
        console.log(activity);
        return activity;
      });
}


activityInfo("Football");

userInfo("amve");


function getRatedActivities(Username){

    

    const query = `SELECT * FROM new_User_table WHERE Username = ? LIMIT 1`;

    DBConnection.query(query, [Username], (err, results) => {
        if (err) {
          console.error('Error fetching user from new_User_table', err);
          return null; 
        }
        if (results.length === 0) {
          console.log('User not found');
          return null; 
        }
        let userid = results[0].User_id;
        

      
        

        const query1 = `SELECT * FROM ratedActivitiestTable WHERE User_id = ? LIMIT 1`;

        DBConnection.query(query1, [userid], (err, results_rating) => {
            if (err) {
              console.error('Error fetching user from new_User_table', err);
              return null; 
            }
            if (results_rating.length === 0) {
              console.log('User not found');
              return null; 
            }

            let listOfRatedActivities = [];
            if(results_rating[0].Football > 0 ){
               
                let ratedActivityFootball = new RatedActivity(activityInfo("Football"),results_rating[0].Football);

                listOfRatedActivities.push(ratedActivityFootball);
            };
            if(results_rating[0].Cheramic > 0 ){
                let ratedActivityCheramic = new RatedActivity(activityInfo("Cheramic"),results_rating[0].Cheramic);

                listOfRatedActivities.push(ratedActivityCheramic);
            };
            if(results_rating[0].Padeltennis > 0 ){
                let ratedActivityPadeltennis = new RatedActivity(activityInfo("Padeltennis"),results_rating[0].Padeltennis);

                listOfRatedActivities.push(ratedActivityPadeltennis);
            };
            if(results_rating[0].Running > 0 ){
                let ratedActivityRunning = new RatedActivity(activityInfo("Running"),results_rating[0].Running);
                listOfRatedActivities.push(ratedActivityRunning);
            };
            if(results_rating[0].Walking > 0 ){
                
                let ratedActivityWalking = new RatedActivity(activityInfo("Walking"),results_rating[0].Walking);

                listOfRatedActivities.push(ratedActivityWalking);
            };

            return listOfRatedActivities;
            
          

    })})}


        console.log(getRatedActivities("mebj"));

class RatedActivity {
    constructor(name, id, listofFeatures, rating)
    {
        this.name = name;
        this.id = id;
        this.listofFeatures = listofFeatures;
        this.rating = rating;
    }
  }
