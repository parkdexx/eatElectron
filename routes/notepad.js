module.exports = {
    channel: "notepad",
    handler: async () => {
        const { exec } = require("child_process");
        return new Promise((resolve) => {
            exec("notepad.exe", (err, stdout, stderr) => {
                resolve(stdout || stderr || err);
            });
        });
    },
};
