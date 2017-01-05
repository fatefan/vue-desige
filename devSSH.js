var node_ssh = require('node-ssh');
var fs = require('fs')
var path = require('path')
var ssh = new node_ssh();
const failed = []
const successful = []
ssh.connect({
    host: 'www.xxxx.com',
    username: 'root',
    port: '22',
    password: 'xxxxx'
}).then(function () {
    ssh.putDirectory('./build', '/opt/remote/', {
        recursive: true,
        validate: function (itemPath) {
            const baseName = path.basename(itemPath)
            return baseName.substr(0, 1) !== '.' && // do not allow dot files
                baseName !== 'node_modules' // do not allow node_modules
        },
        tick: function (localPath, remotePath, error) {
            if (error) {
                failed.push(localPath)
            } else {
                successful.push(localPath)
            }
        }
    }).then(function (successful) {
        console.log("successful:", successful);
        process.exit();
    })
})