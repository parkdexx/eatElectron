const { contextBridge, ipcRenderer } = require('electron');

// 수동 등록 방식으로 변경
contextBridge.exposeInMainWorld('api', {
    version: (...args) => ipcRenderer.invoke('version', ...args),
    ping: (...args) => ipcRenderer.invoke('ping', ...args),
    notepad: (...args) => ipcRenderer.invoke('notepad', ...args)
});