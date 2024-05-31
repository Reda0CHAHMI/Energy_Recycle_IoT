const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

// Chemin du fichier de données
const dataFilePath = path.join(__dirname, 'data');
// Chemin du fichier HTML
const htmlFilePath = path.join(__dirname, 'data.html');

// Créer un serveur WebSocket
const wss = new WebSocket.Server({ port: 8765 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Fonction pour envoyer les données aux clients WebSocket
function sendDataToClients(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// Fonction pour mettre à jour le fichier HTML
function updateHtmlFile(data) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Data from Arduino</title>
    </head>
    <body>
      <h1>Data from Arduino</h1>
      <pre>${data}</pre>
    </body>
    </html>
  `;
  
  fs.writeFile(htmlFilePath, htmlContent, (err) => {
    if (err) {
      console.error('Error writing to HTML file:', err);
    } else {
      console.log('HTML file updated');
    }
  });
}

// Surveiller les modifications du fichier avec fs.watch
fs.watch(dataFilePath, (eventType) => {
  if (eventType === 'change') {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      console.log('File changed, sending data to clients and updating HTML file');
      sendDataToClients(data);
      updateHtmlFile(data);
    });
  }
});

// Lire le fichier initialement pour envoyer les données existantes
fs.readFile(dataFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('Initial file read, sending data to clients and updating HTML file');
  sendDataToClients(data);
  updateHtmlFile(data);
});

