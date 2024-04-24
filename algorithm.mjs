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
//const args = ['peter', '5',"5",5,'5','5', JSON.stringify(new RatedActivity('Soccer', 51, [5,5,5,5,5], 5))];
export async function PythonFeatureCalculation(args) {
  // Path to your Python script
  const pythonScriptPath = '/srv/www/cs-24-sw-2-13.p2datsw.cs.aau.dk/data/psnode/GitRepo/script1.py';
  const pythonProcess = spawn('python', [pythonScriptPath, ...args]);


  let data = "";
  for await (const chunk of pythonProcess.stdout)
  {
    data += chunk;
  }

  // Listen for errors from the Python script
  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });


  const exitcode = await new Promise((resolve, reject) => {
    pythonProcess.on('close', resolve);
  })

  if(exitcode) {
    throw new Error( `subprocess error exit ${exitCode}, ${error}`);
  }

  return data;
}


//Returns an object, where the subvariable .ListOfObjectIDs contains a list of the top 5 activities, when using cosine similarity
export async function PythonCosineComparer(args)
{
  const pythonCosinePath = '/srv/www/cs-24-sw-2-13.p2datsw.cs.aau.dk/data/psnode/GitRepo/cosineComparer.py';
  //const pythonCosinePath = '/Users/peter/Documents/GitHub/P2/P2/cosineComparer.py';
  const pythonProcess = spawn('python', [pythonCosinePath, ...args]);

  let data = "";
  for await (const chunk of pythonProcess.stdout)
  {
    data += chunk;
  }

  // Listen for errors from the Python script
  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });


  const exitcode = await new Promise((resolve, reject) => {
    pythonProcess.on('close', resolve);
  })

  if(exitcode) {
    throw new Error( `subprocess error exit ${exitCode}, ${error}`);
  }

  return JSON.parse(data);
}

//let testingVars = [3,3,3,3,3, JSON.stringify(new RatedActivity('Soccer', 51, [5,5,5,5,5], 5)), JSON.stringify(new RatedActivity('Basket', 51, [5,5,5,5,5], 5)),JSON.stringify(new RatedActivity('Basket', 51, [5,5,5,5,5], 5)), JSON.stringify(new RatedActivity('Basket', 51, [5,5,5,5,5], 5)), JSON.stringify(new RatedActivity('Basket', 51, [5,5,5,5,5], 5))];
//let finalResult = await PythonCosineComparer(testingVars);
//console.log(finalResult);
//let returnObject = JSON.parse(finalResult);
//console.log(returnObject.ListOfObjectIDs);

//let result = await PythonFeatureCalculation(['peter', '5',"5",5,'5','5', JSON.stringify(new RatedActivity('Soccer', 51, [5,5,5,5,5], 5))]);
//console.log(result);

