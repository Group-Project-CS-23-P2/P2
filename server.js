import optimize from "optimization-js";
import http from 'http';
import fs from "fs";
import url from "url";

const clientHTML = fs.readFileSync("/srv/www/cs-24-sw-2-13.p2datsw.cs.aau.dk/data/psnode/RecommenderApp/HTML-Pages/frontpage.html");

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
        }).end(clientHTML);
        response.end();
    }
})