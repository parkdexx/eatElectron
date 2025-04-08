const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path') // for preload
const { exec } = require('child_process') // for command

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

// for ping command
ipcMain.handle('ping', async () => {
    return new Promise((resolve, reject) => {
        // cmd ping 결과를 영어로 출력하기 위해 chcp 437 명령어를 사용
        exec('chcp 437 && ping 8.8.8.8', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`)
                resolve(error) //reject(error)
            }
            resolve(stdout ? stdout : stderr)
        })
    })
})

ipcMain.handle('notepad', async () => {
    return new Promise((resolve, reject) => {
        exec('notepad.exe', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`)
                resolve(error) //reject(error)
            }
            resolve(stdout ? stdout : stderr)
        })
    })
})

app.whenReady().then(() => {
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