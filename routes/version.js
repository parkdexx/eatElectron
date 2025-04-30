module.exports = {
    channel: "version",
    handler: async () => {
        return new Promise((resolve) => {
            resolve({
                node: process.versions.node,
                chrome: process.versions.chrome,
                electron: process.versions.electron,
                temp: 'hello world'
            });
        });
    },
};
