const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${preload.chrome()}), Node.js (v${preload.node()}), and Electron (v${preload.electron()})`

const pingButton = document.getElementById('pingButton')
const pingResult = document.getElementById('pingResult')
pingButton.addEventListener('click', async () => {
    pingResult.textContent = '핑 테스트 중...';
    const output = await window.preload.ping();
    pingResult.textContent = output;
})

const notepadButton = document.getElementById('notepadButton')
notepadButton.addEventListener('click', async () => {
    pingResult.textContent = '메모장 실행 중...';
    const output = await window.preload.notepad();
    pingResult.textContent = output;
})