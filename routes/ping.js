module.exports = {
    channel: "ping",
    handler: async () => {
        const { exec } = require("child_process");
        return new Promise((resolve) => {
            exec("chcp 437 && ping 8.8.8.8", (err, stdout, stderr) => {
                resolve(stdout || stderr || err);
            });
        });
    },
};
