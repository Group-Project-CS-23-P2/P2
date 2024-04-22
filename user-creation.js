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

// INPUT VALIDATION FOR PASSWORD
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

    if (typeof age !== 'number') {
        return alert('Invalid Age! Please provide a valid age.');
    }

    if (age < 0 || 150 > age) {
        return alert('Invalid Age! Please provide a valid age.');
    }
}

document.getElementById('nameForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const ageInput = document.getElementById('ageInput').value;

    if(!isValidAge(ageInput)) {
        alert('Invalid age! Please provide a valid age.');
        return;
    } 
    console.log('Valid age:', ageInput);
});

// INPUT VALIDATION FOR ATTRIBUTES
function isValidAttribute(attribute){
    if (typeof attribute !== number){
        return alert ('Please choose a number from 1 to 5.');
    }

    if (!Number.isInteger(attribute)) {
        return alert('Please choose a number from 1 to 5.');
    }

    if (attribute < 1 || attribute > 5) {
        return alert ('Please choose a number from 1 to 5.');
    }
}
document.getElementById('nameForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const attributeInput = document.getElementById('attributeInput').value;

    if(!isValidAttribute(attributeInput)) {
        alert('Invalid input! Please provide a number from 1 to 5.');
        return;
    } 
    console.log('Valid:', attributeInput);
});

const fs = require("fs");

//brugeren der skal omdannes til json fil 
const jsonString = JSON.stringify(new_User);
fs.readFile('data.json', 'utf8', (err,data) => {
    if (err) {
        console.error('Error reading file', err);
        return;
    }

    const jsonData = JSON.parse(data);

    //Det her skal pege mod stedet hvor POST request skal være "serveren" AXIOS SKAL INSTALLERES
    axios.post('cs-24-sw-2-13.p2datsw.cs.aau.dk/', jsonData).then(response => {
        console.log('Response', response.data);
    })
    .catch(error => {
        console.error('Error:', error)
    });
});
