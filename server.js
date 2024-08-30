const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const app = express();
let applications = []; // In-memory storage for simplicity

app.use(express.json());

// Serve static files from the "src" directory
app.use(express.static(path.join(__dirname, 'src')));

app.post('/Launcher', (req, res) => {
    const { appPath, parameters } = req.body;

    if (!appPath) {
        return res.status(400).send('Application path is required');
    }

    const command = `"${appPath}" ${parameters || ''}`;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error launching application: ${error.message}`);
            return res.status(500).send(`Error: ${error.message}`);
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).send(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        res.send(`Application launched: ${appPath}`);
    });
});

// Endpoint to get the list of applications
app.get('/apps', (req, res) => {
    res.json(applications);
});

// Endpoint to add a new application
app.post('/apps', (req, res) => {
    const app = req.body;
    applications.push(app);
    res.status(201).json(app);
});

// Endpoint to delete an application
app.delete('/apps/:path', (req, res) => {
    const appPath = decodeURIComponent(req.params.path);
    applications = applications.filter(app => app.path !== appPath);
    res.json({ message: "Application removed" });
});

const PORT = 2354;
const HOST = '127.0.0.1';
app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}/Launcher`);
});
