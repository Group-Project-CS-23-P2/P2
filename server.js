import http from 'http';
import fs from "fs";
import url from "url";
import mysql from "mysql";
import { PythonFeatureCalculation } from './Modules/algorithm.mjs';
import { PythonCosineComparer } from './Modules/algorithm.mjs';
import {createUser} from './Modules/FunctionsForDB.mjs';
import {getRatedActivities} from './Modules/FunctionsForDB.mjs';
import {GetAllActivities} from './Modules/FunctionsForDB.mjs';
import {userInfo} from './Modules/FunctionsForDB.mjs';
import { error } from 'console';



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
        request.setEncoding("utf8");
        let body = "";
        for await (let chunk of request) {
            body += chunk;
        }

        console.log(body);


        let requestInfo = JSON.parse(body);
        /*if (requestInfo.Username.length != sanitize(requestInfo.Username)) {
            response.writeHead(400, 
                {
                    "Content-Type": "text/html"
                }).end("The given username was not valid, it cannot contain special characters.");
                response.end();
                return;
        }*/
        

        try {createUser(requestInfo)} catch (error) {            
                response.writeHead(400, {
                    "Content-Type": "text/html"
                }).end("An error occured while adding the user to the database");
                response.end();
                return;
            }

        response.writeHead(200, {
            "Content-Type": "text/html"
        }).end("Post received and added succcesfully");
        response.end();
    }

    //Rating POST
    else if (pathname === "/submitrating/" && request.method === 'POST') {
        console.log("SubmitRating received as:");
        console.log(request.body);
        //requestinfo = JSON.parse(request.body);
        //try {AddRating(requestinfo)}
        //catch (e) {}

        response.writeHead(200, {
            "Content-Type": "text/html"
        }).end();
        response.end();
    }

    //Group Query GET
    else if (pathname === "/grouprequest/" && request.method === 'GET') {
        //requestinfo = JSON.parse(request.body);
        //let returnList;
        console.log("GroupRequest received as:");
        console.log(request.body);

        let listOfUsers = JSON.parse(request.body);
        for (let i = 0; i < listOfUsers.length; i++)
        {
            if(listOfUsers[i].length != sanitize(listOfUsers[i].length))
            {
                response.writeHead(400, {
                    "Content-Type": "text/html"
                }).end("One or more usernames are incorrectly typed. Please check that none contain special characters");
                response.end();
                return
            }
        }
        //If function succeeds
        response.writeHead(200, {
        "Content-Type": "application/json"
        }).end();
        response.end();
        }
    
        
    }
)

console.log(await GroupQuery(["Peter","Anton","Mikkel"]));

function AddRating()
{
    //Sanitize Relevant JSON variables
}

async function GroupQuery(requestinfo)
{
    //Sanitize Relevant JSON variables
    let listOfUserFeatures = [];
    let returnList = [];

    for(let i = 0; i < requestinfo.length; i++)
    {
        let currentUser = await userInfo(requestinfo[i]);
        let currentActivities = await getRatedActivities(currentUser.name);
        console.log(currentActivities);
        let currentArgs = [currentUser.name];

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
        console.log(currentArgs);
        let currentUserFeatures = JSON.parse(await PythonFeatureCalculation(currentArgs));
        listOfUserFeatures.push(currentUserFeatures);
    }

    console.log("Exited first for loop successfully");
    console.log(listOfUserFeatures);

    //Calculate the group vector
    let finalGroupVector = [0,0,0,0,0];
    console.log(listOfUserFeatures.length);
    for(let i = 0; i < listOfUserFeatures.length; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            console.log(listOfUserFeatures[i][j]);
            finalGroupVector[j] += listOfUserFeatures[i][j];
        }
    }

    console.log("Exited double for loop");

    for(let i = 0; i <= finalGroupVector.length; i++)
    {finalGroupVector[i] = finalGroupVector[i] / listOfUserFeatures.length;}

    console.log("Exited division for loop");

    let listOfAllActivities = await GetAllActivities();
    console.log("Got all activities");
    
    currentArgs = [];
    for(let i = 0; i < 5; i++)
    {
        currentArgs.push(finalGroupVector[i]);
    }

    for (let i = 0; i < listOfAllActivities.length; i++)
    {
        currentArgs.push(JSON.stringify(listOfAllActivities[i]));
    }

    console.log("Exited two argument for loops");
    //Send group vector to python to calculate group similarity

    let recommendedActivities = await PythonCosineComparer(currentArgs);
    
    //Returns list of best fitting activities
    return recommendedActivities;
}

function sanitize(str){
    str=str
  .replace(/&/g, "")
  .replace(/</g, "")
  .replace(/>/g, "")
  .replace(/"/g, "")
  .replace(/'/g, "")
  .replace(/`/g, "")
  .replace(/\//g, "");
  return str.trim();
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
