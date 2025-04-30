(async () => {
    const information = document.getElementById('info')
    const version = await window.api.version()

    information.innerText =
        `This app is using Chrome (v${await window.api.version().then(v => v.chrome)}), 
        Node.js (v${version.node}), 
        and Electron (v${version.electron})
        and temp (${version.temp})
        `
})();


const pingButton = document.getElementById('pingButton')
const pingResult = document.getElementById('pingResult')
pingButton.addEventListener('click', async () => {
    pingResult.textContent = '핑 테스트 중...';
    const output = await window.api.ping();
    pingResult.textContent = output;
})

const notepadButton = document.getElementById('notepadButton')
notepadButton.addEventListener('click', async () => {
    pingResult.textContent = '메모장 실행 중...';
    const output = await window.api.notepad();
    pingResult.textContent = output;
})