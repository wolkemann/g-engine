const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const isDev = process.env.IS_DEV === "true";

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    center: true,
    backgroundColor: "black",
    icon: `${path.join(__dirname, "/build/favicon.ico")}`,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "/src/preload.js"),
    },
  });

  // Open the DevTools.
  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.webContents.loadURL(
      `file://${path.join(__dirname, "/build/index.html")}`
    );
    mainWindow.removeMenu();
  }

  ipcMain.handle("closeWindow", () => {
    mainWindow.close();
  });

  ipcMain.on("getWindowProps-request", (event) => {
    event.returnValue = mainWindow.getContentBounds();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
