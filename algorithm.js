import { spawn } from 'child_process';

class RatedActivity {
  constructor(name, id, listofFeatures, rating)
  {
      this.name = name;
      this.id = id;
      this.listofFeatures = listofFeatures;
      this.rating = rating;
  }
}

//Args should be in the form [Name, Quizval1, Quizval2, Quizval3, Quizval4, Quizval5, JSON string of rated activity]...
//Amount of activities is unlimited
//Example:  const args = ['peter', '5',"5",5,'5','5', JSON.stringify(new RatedActivity('Soccer', 51, [5,5,5,5,5], 5))];
function PythonFeatureCalculation(args) {
  // Path to your Python script
  const pythonScriptPath = '/Users/peter/Documents/GitHub/P2/P2/script1.py';


  // Spawn a new Python process
  const pythonProcess = spawn('py', [pythonScriptPath, ...args]);

  // Listen for data from the Python script
  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    let result = JSON.parse(data);
    return result;
  });

  // Listen for errors from the Python script
  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  // Listen for when the Python script exits
  pythonProcess.on('close', (code) => {
    console.log(`Python script exited with code ${code}`);
  });  
}

function PythonCosineComparer(args)
{
  const pythonCosinePath = '/Users/peter/Documents/GitHub/P2/P2/cosineComparer.py';
  const pythonProcess = spawn('py', [pythonCosinePath, ...args]);

    // Listen for data from the Python script
    pythonProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
  
    // Listen for errors from the Python script
    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  
    // Listen for when the Python script exits
    pythonProcess.on('close', (code) => {
      console.log(`Python script exited with code ${code}`);
    });  

}

let testingVars = [3,3,3,3,3, JSON.stringify(new RatedActivity('Soccer', 51, [5,5,5,5,5], 5)), JSON.stringify(new RatedActivity('Basket', 51, [5,5,5,5,5], 5))];
let result = PythonCosineComparer((testingVars));