import { exec } from 'child_process';
import { homedir } from 'os';
import * as fs from 'fs';
import * as path from 'path';


export function execShell(sh:string, cwd?: string): Promise<string> {
  return new Promise((resolve, reject) => {
      exec(sh, {
        cwd: cwd || homedir()
      }, (error: Error, stdout:string, stderr:string) => {
          if (error) {
              console.log('execShell failed', stderr);
              return reject(error);
          }
          resolve(stdout);
      });
  });
}

export function writeSSHKey(content:string) {
  const sshFolder = path.join(homedir(), '.ssh');
  if (!fs.existsSync(sshFolder)) {
      fs.mkdirSync(sshFolder);
  }
  fs.writeFileSync(path.join(sshFolder, 'id_rsa'), content, {
    encoding: 'utf-8',
    mode: 384, // 0600
    flag: 'w'
  });
}

export function getProjectDir() {
  return path.join(homedir(), 'project');
}

export function getLocalGitDir(gitUrl:string) {
  const folder = (gitUrl.split('/').pop() || '').trim().replace(/\.git$/i, '');
  return folder ? path.join(homedir(), 'project', folder): '';
}

export function getConfigFilePath() {
  return path.join(homedir(), '.ide', 'config.json');
}

export function getDefaultWorkspace() {
  const projectDir = getProjectDir();
  const dirs = ['main-java-project', 'main-c-project', 'main-cpp-project', 'main-python-project', 'main-r-project'];
  for (let i = 0; i < dirs.length; i += 1) {
    try {
      const tmp = path.join(projectDir, dirs[i]);
      fs.statSync(tmp);
      return tmp;
    } catch (e) {}
  }
  return projectDir;
}
