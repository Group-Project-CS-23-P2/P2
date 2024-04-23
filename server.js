import optimize from "optimization-js";
import http from 'http';
import fs from "fs";
import url from "url";
import mysql from "mysql";
import { PythonFeatureCalculation } from './algorithm.mjs';
import { PythonCosineComparer } from './algorithm.mjs';
import {CreateUser} from './FunctionsForDB.mjs';


const frontpageHTML = fs.readFileSync("/srv/www/cs-24-sw-2-13.p2datsw.cs.aau.dk/data/psnode/GitRepo/HTML-Pages/frontpage.html");
const usercreationHTML = fs.readFileSync("/srv/www/cs-24-sw-2-13.p2datsw.cs.aau.dk/data/psnode/GitRepo/HTML-Pages/UserCreation.html");
const groupqueryHTML = fs.readFileSync("/srv/www/cs-24-sw-2-13.p2datsw.cs.aau.dk/data/psnode/GitRepo/HTML-Pages/GroupQuery.html");
const userratingHTML = fs.readFileSync("/srv/www/cs-24-sw-2-13.p2datsw.cs.aau.dk/data/psnode/GitRepo/HTML-Pages/UserRating.html");

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
        console.log("CreateUser received as:");
        console.log(request.headers.data);

        request.setEncoding("utf8");
        let body = "";
        for await (let chunk of request) {
            body += chunk;
        }

        console.log(body);

        //Data is received in the header, as the body remains as undefined, no matter how the request is posted
        //This is highly suboptimal, but for now, it's a working communication.
        let requestInfo = JSON.parse(request.headers.data);
        try {CreateUser(requestInfo)} catch (error) {
            
        }
        response.writeHead(200, {
            "Content-Type": "text/html"
        }).end(JSON.stringify("Post received"));
        response.end();
    }

    //Rating POST
    else if (pathname === "/submitrating/" && request.method === 'POST') {
        //requestinfo = JSON.parse(request.body);
        //try {AddRating(requestinfo)}
        //catch (e) {}
        console.log("SubmitRating received as:");
        console.log(request.body);

        response.writeHead(200, {
            "Content-Type": "application/json"
        }).end();
        response.end();
    }

    //Group Query GET
    else if (pathname === "/grouprequest/" && request.method === 'GET') {
        //requestinfo = JSON.parse(request.body);
        //let returnList;
        //try {returnList =  await GroupQuery(requestinfo);}
        //If function fails
        //catch (e) {}  
        console.log("GroupRequest received as:");
        console.log(request.body);

        //If function succeeds
        response.writeHead(200, {
        "Content-Type": "application/json"
        }).end();
        response.end();
        }

        
    }
)



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

class RatedActivity {
    constructor(name, id, listofFeatures, rating)
    {
        this.name = name;
        this.id = id;
        this.listofFeatures = listofFeatures;
        this.rating = rating;
    }
  }
