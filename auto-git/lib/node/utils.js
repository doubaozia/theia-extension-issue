"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultWorkspace = exports.getConfigFilePath = exports.getLocalGitDir = exports.getProjectDir = exports.writeSSHKey = exports.execShell = void 0;
const child_process_1 = require("child_process");
const os_1 = require("os");
const fs = require("fs");
const path = require("path");
function execShell(sh, cwd) {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(sh, {
            cwd: cwd || (0, os_1.homedir)()
        }, (error, stdout, stderr) => {
            if (error) {
                console.log('execShell failed', stderr);
                return reject(error);
            }
            resolve(stdout);
        });
    });
}
exports.execShell = execShell;
function writeSSHKey(content) {
    const sshFolder = path.join((0, os_1.homedir)(), '.ssh');
    if (!fs.existsSync(sshFolder)) {
        fs.mkdirSync(sshFolder);
    }
    fs.writeFileSync(path.join(sshFolder, 'id_rsa'), content, {
        encoding: 'utf-8',
        mode: 384, // 0600
        flag: 'w'
    });
}
exports.writeSSHKey = writeSSHKey;
function getProjectDir() {
    return path.join((0, os_1.homedir)(), 'project');
}
exports.getProjectDir = getProjectDir;
function getLocalGitDir(gitUrl) {
    const folder = (gitUrl.split('/').pop() || '').trim().replace(/\.git$/i, '');
    return folder ? path.join((0, os_1.homedir)(), 'project', folder) : '';
}
exports.getLocalGitDir = getLocalGitDir;
function getConfigFilePath() {
    return path.join((0, os_1.homedir)(), '.ide', 'config.json');
}
exports.getConfigFilePath = getConfigFilePath;
function getDefaultWorkspace() {
    const projectDir = getProjectDir();
    const dirs = ['main-java-project', 'main-c-project', 'main-cpp-project', 'main-python-project', 'main-r-project'];
    for (let i = 0; i < dirs.length; i += 1) {
        try {
            const tmp = path.join(projectDir, dirs[i]);
            fs.statSync(tmp);
            return tmp;
        }
        catch (e) { }
    }
    return projectDir;
}
exports.getDefaultWorkspace = getDefaultWorkspace;
//# sourceMappingURL=utils.js.map