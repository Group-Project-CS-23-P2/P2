const optimizationjs = require('optimization-js');
import http from 'http';
import fs from "fs";
import url from "url";

let server = new http.Server();
server.listen(3430, "localhost", () => {
	console.log("To connect to the chat, go to http://localhost:3430/");
});