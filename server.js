import optimize from "optimization-js";
import http from 'http';
import fs from "fs";
import url from "url";
import mysql from "mysql";
import { PythonFeatureCalculation } from './algorithm.mjs';
import { PythonCosineComparer } from './algorithm.mjs';


const frontpageHTML = fs.readFileSync("/srv/www/cs-24-sw-2-13.p2datsw.cs.aau.dk/data/psnode/RecommenderApp/HTML-Pages/frontpage.html");
const usercreationHTML = fs.readFileSync("/srv/www/cs-24-sw-2-13.p2datsw.cs.aau.dk/data/psnode/RecommenderApp/HTML-Pages/UserCreation.html");
const groupqueryHTML = fs.readFileSync("/srv/www/cs-24-sw-2-13.p2datsw.cs.aau.dk/data/psnode/RecommenderApp/HTML-Pages/GroupQuery.html");
const userratingHTML = fs.readFileSync("/srv/www/cs-24-sw-2-13.p2datsw.cs.aau.dk/data/psnode/RecommenderApp/HTML-Pages/UserRating.html");

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

let server = new http.Server();
server.listen(3430, "localhost", () => {
	console.log("To connect to the chat, go to http://localhost:3430/");
});


server.on("request", async (request, response) => {
    //Parse where the request wants to go.
    let pathname = url.parse(request.url).pathname;
    console.log("", pathname);

    //Standard front page respone
    if (pathname === "/") { // A request for the front page
        response.writeHead(200, {
            "Content-Type": "text/html"
        }).end(frontpageHTML);
        response.end();
    }

    else if (pathname === "/usercreation/") { // A request for the user creation page
        response.writeHead(200, {
            "Content-Type": "text/html"
        }).end(usercreationHTML);
        response.end();
    }

    else if (pathname === "/groupquery/") { // A request for the group query page
        response.writeHead(200, {
            "Content-Type": "text/html"
        }).end(groupqueryHTML);
        response.end();
    }

    else if (pathname === "/rating/") { // A request for the rating page
        response.writeHead(200, {
            "Content-Type": "text/html"
        }).end(userratingHTML);
        response.end();
    }

    //API Requests

    //User creation POST
    else if (pathname === "/createuser/" && request.method === 'POST') {
        requestinfo = JSON.parse(request.body);
        try {CreateUser(requestinfo);}
        catch (e) {}
        response.writeHead(200, {
            "Content-Type": "application/json"
        }).end();
        response.end();
    }

    //Rating POST
    else if (pathname === "/submitrating/" && request.method === 'POST') {
        requestinfo = JSON.parse(request.body);
        try {AddRating(requestinfo)}
        catch (e) {}
        
        response.writeHead(200, {
            "Content-Type": "application/json"
        }).end();
        response.end();
    }

    //Group Query GET
    else if (pathname === "/grouprequest/" && request.method === 'GET') {
        requestinfo = JSON.parse(request.body);
        let returnList;
        try {returnList =  await GroupQuery(requestinfo);}
        //If function fails
        catch (e) {}  
        
        //If function succeeds
        response.writeHead(200, {
        "Content-Type": "application/json"
        }).end();
        response.end();
        }

        
    }
)

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
    userInfo.username,
    userInfo.Password, 
    userInfo.age,
    userInfo.physical,
    userInfo.creative,
    userInfo.brainy,
    userInfo.social,
    userInfo.competetive,
    userInfo.pricepoint
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

async function GroupQuery(requestinfo)
{
    //Sanitize Relevant JSON variables
    let returnList = [];

    for(let i = 0; i < requestinfo.length; i++)
    {
        let currentUser = userInfo();
        let currentActivities = userRatedActivities();
        let currentArgs = [currentUser.Username];

        //Add the currentUser features to arguments.
        for(let j = 0; j < 5; j++)
        {
            currentArgs.push(currentUser.listofFeatures[j]);
        }

        //Add the current 
        for(let j = 0; j < currentActivities.length; j++)
        {
            currentArgs.push(JSON.stringify(currentActivities[j]));
        }

        
        //Get activities for user I
        //Send it all to algorithm function.
        //Add returned list to list of user features
    }

    //Calculate the group vector
    //Send group vector to python to calculate group similarity

    
    //Returns list of best fitting activities
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
                let running_name = activityInfo("Running").name;
                let running_id = activityInfo("Running").id;
                let running_features = activityInfo("Running").listofFeatures;
                let ratedActivityRunning = new RatedActivity(running_name ,running_id, running_features, results_rating[0].Running);

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
