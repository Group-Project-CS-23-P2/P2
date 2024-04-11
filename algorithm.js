import { spawn } from 'child_process';

class Activity {
  constructor(name, id, listofFeatures)
  {
      this.name = name;
      this.id = id;
      this.listofFeatures = listofFeatures;
  }
}

// Path to your Python script
const pythonScriptPath = '/Users/peter/Documents/GitHub/P2/P2/script1.py';

// Arguments to pass to the Python script
const args = ['peter', '5','5','5','5','5', JSON.stringify(new Activity('Soccer', 51, [5,5,5,5,5]))];

// Spawn a new Python process
const pythonProcess = spawn('py', [pythonScriptPath, ...args]);

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
