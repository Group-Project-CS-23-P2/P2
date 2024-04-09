import { spawn } from 'child_process';

// Path to your Python script
const pythonScriptPath = '/Users/peter/Documents/GitHub/P2/P2/script1.py';

// Arguments to pass to the Python script
const args = ['arg1', 'arg2', 'arg3'];

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

