// INPUT VALIDATION USERNAME
function isValidUsername(username) {
    const usernameRegex = /^[a-zA-Z\s'-]+$/;
    return usernameRegex.test(username);
}

//Her mener jeg submit er det burgeren nu end skal trykke for at afslutte sin indtastning.
document.getElementById('nameForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('usernameInput').value;

    if(!isValidUsername(usernameInput)) {
        alert('Invalid name! Please provide a valid name.');
        return;
    } 
    console.log('Valid name:', usernameInput);
});

// INPUT VALIDATION FOR PASSWORD MANGLER REGEX!!!
function isValidPassword(password){
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
}

document.getElementById('nameForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const passwordInput = document.getElementById('passwordInput').value;

    if(!isValidPassword(passwordInput)) {
        alert('Invalid password! Please provide a valid password.');
        return;
    }
    console.log('Valid password:', passwordInput);
});

// INPUT VALIDATION FOR AGE
function isValidAge(age){

}

// INPUT VALIDATION FOR ATTRIBUTES
function isValidAttribute(attribute){

}

const fs = require("fs");

//brugeren der skal omdannes til json fil 
const jsonString = JSON.stringify(new_User);
fs.readFile('data.json', 'utf8', (err,data) => {
    if (err) {
        console.error('Error reading file', err);
        return;
    }

    const jsonData = JSON.parse(data);

    //Det her skal pege mod stedet hvor POST request skal være "serveren"
    axios.post('/srv/www/cs-24-sw-2-13.p2datsw.cs.aau.dk/data/psnode/RecommenderApp/System', jsonData).then(response => {
        console.log('Response', response.data);
    })
    .catch(error => {
        console.error('Error:', error)
    });
});
