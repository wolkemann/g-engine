const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  closeWindow: () => {
    ipcRenderer.invoke("closeWindow");
  },
  getWindowProps: () => {
    return ipcRenderer.sendSync("getWindowProps-request");
  },
});
