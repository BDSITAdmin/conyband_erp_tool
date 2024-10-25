const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    // Test with a single known icon for all platforms
    icon: path.join(__dirname, 'assets', 'favicon.ico') // Change to a single known icon for testing
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
