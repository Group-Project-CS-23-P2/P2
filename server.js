import optimize from "optimization-js";
import http from 'http';
import fs from "fs";
import url from "url";
import mysql from "mysql";

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


server.on("request", (request, response) => {
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
        try {GroupQuery(requestinfo);}
        //If function fails
        catch (e) {        
            response.writeHead(200, {
            "Content-Type": "application/json"
            }).end();
            response.end();
        }

        //If function succeeds
        response.writeHead(200, {
            "Content-Type": "application/json"
        }).end();
        response.end();
    }
})

const userInfotest = {
    Username: "mebj",
    Password: "Kjelderenhurtigkat10!",
    Age: 23,
    Physical: 5,
    Creative: 2,
    Brainy: 3,
    Social: 4,
    Competative: 5,
    Pricepoint: 0
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

userInfo("mebj");