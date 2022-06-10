const { contextBridge, ipcRenderer, webFrame } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  closeWindow: () => {
    ipcRenderer.invoke("closeWindow");
  },
  gg: () => {
    console.log(webFrame.getZoomLevel());
    console.log(webFrame.getZoomFactor());
  },
});
