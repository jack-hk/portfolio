// This script is used for using the theme found in /local/ instead of the hosted, live one. Run it with "node local.js".

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const publicDir = path.join(__dirname, 'public');
const localDir = path.join(__dirname, 'local');

// Create the "local" directory if it doesn't exist
if (!fs.existsSync(localDir)) {
    fs.mkdirSync(localDir);
    console.log(`Created directory: ${localDir}`);
} else {
    console.log(`Directory already exists: ${localDir}`);
}

// Check if the "public" directory exists and remove it if so
if (fs.existsSync(publicDir)) {
    fs.rmSync(publicDir, { recursive: true, force: true });
    console.log(`Successfully deleted ${publicDir}`);
} else {
    console.log(`The directory ${publicDir} does not exist.`);
}

process.env.HUGO_MODULE_REPLACEMENTS = `github.com/jack-hk/PaperJack -> ${localDir}\\PaperJack`;

const hugoProcess = spawn('hugo', ['server']);

hugoProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

hugoProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

hugoProcess.on('close', (code) => {
    console.log(`Hugo process exited with code ${code}`);
});
