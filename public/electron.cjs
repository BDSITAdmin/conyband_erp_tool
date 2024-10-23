const { app, BrowserWindow,Menu } = require('electron');
const path = require('path');



function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      icon: path.join(__dirname, 'assets', 'apple-touch-icon.png'), 
      nodeIntegration: true
    }
  });

   // Remove the default menu
   Menu.setApplicationMenu(null);
  

  mainWindow.loadURL('http://localhost:5173');
}



app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});