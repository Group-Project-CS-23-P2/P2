import { spawn } from 'child_process';
import { stringify } from 'querystring';

class RatedActivity {
  constructor(name, id, listofFeatures, rating)
  {
      this.name = name;
      this.id = id;
      this.listofFeatures = listofFeatures;
      this.rating = rating;
  }
}

//Used to make sure the Python processes finish. Rewriting the functions is possible, but would take substantial refactoring,
//For now, this works.
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

//Args should be in the form [Name, Quizval1, Quizval2, Quizval3, Quizval4, Quizval5, JSON string of rated activity]...
//Amount of activities is unlimited
//Example:  const args = ['peter', '5',"5",5,'5','5', JSON.stringify(new RatedActivity('Soccer', 51, [5,5,5,5,5], 5))];
export async function PythonFeatureCalculation(args) {
  // Path to your Python script
  const pythonScriptPath = '/srv/www/cs-24-sw-2-13.p2datsw.cs.aau.dk/data/psnode/RecommenderApp/script1.py';

  let finalResult;
  // Spawn a new Python process
  const pythonProcess = spawn('python', [pythonScriptPath, ...args]);

  // Listen for data from the Python script
  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    finalResult = JSON.parse(data);
  });

  // Listen for errors from the Python script
  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  // Listen for when the Python script exits
  pythonProcess.on('close', (code) => {
    console.log(`Python script exited with code ${code}`);
  });  


  await sleep(1000);
  return finalResult;
}


//Returns an object, where the subvariable .ListOfObjectIDs contains a list of the top 5 activities, when using cosine similarity
export async function PythonCosineComparer(args)
{
  let finalResult;

  const pythonCosinePath = '/srv/www/cs-24-sw-2-13.p2datsw.cs.aau.dk/data/psnode/RecommenderApp/cosineComparer.py';
  const pythonProcess = spawn('python', [pythonCosinePath, ...args]);

    // Listen for data from the Python script
    pythonProcess.stdout.on('data', (data) => {
      //console.log(`stdout: ${data}`);
      let convertedData = "" + data;
      //console.log(convertedData);
      finalResult = JSON.parse(convertedData);
    });
  
    // Listen for errors from the Python script
    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  
    // Listen for when the Python script exits
    pythonProcess.on('close', (code) => {
      console.log(`Python script exited with code ${code}`);
    });  


  await sleep(1000);
  return finalResult;
}

//let testingVars = [3,3,3,3,3, JSON.stringify(new RatedActivity('Soccer', 51, [5,5,5,5,5], 5)), JSON.stringify(new RatedActivity('Basket', 51, [5,5,5,5,5], 5)),JSON.stringify(new RatedActivity('Basket', 51, [5,5,5,5,5], 5)), JSON.stringify(new RatedActivity('Basket', 51, [5,5,5,5,5], 5)), JSON.stringify(new RatedActivity('Basket', 51, [5,5,5,5,5], 5))];
//let finalResult = await PythonCosineComparer(testingVars);
//console.log(finalResult.ListOfObjectIDs);
//console.log(finalResult.ListOfObjectIDs);

//let result = await PythonFeatureCalculation(['peter', '5',"5",5,'5','5', JSON.stringify(new RatedActivity('Soccer', 51, [5,5,5,5,5], 5))]);
//console.log(result);

