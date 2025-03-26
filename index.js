const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile('index.html')
}

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