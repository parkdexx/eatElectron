const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path') // for preload
const { exec } = require('child_process') // for command
const fs = require('fs') // for file system

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,

        // for preload
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    // 자동 핸들러 등록
    const routesPath = path.join(__dirname, 'routes')
    fs.readdirSync(routesPath).forEach(file => {
        const { channel, handler } = require(path.join(routesPath, file));
        ipcMain.handle(channel, handler);
    })

    createWindow()

    // 열려있는 창이 없으면, 창을 열도록 설정 (macOS ONLY)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 모든 창이 닫히면, 앱 종료를 하도록 설정
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})