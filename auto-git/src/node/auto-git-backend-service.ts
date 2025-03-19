import { injectable } from '@theia/core/shared/inversify';

import { AutoGitBackendService, RemoteResponse } from '../common/protocol';
import { ConfigFile } from '../shared';

import { execShell, writeSSHKey, getProjectDir, getLocalGitDir, getConfigFilePath, getDefaultWorkspace } from './utils';
import { STAGE } from '../common/constants';
import axios from 'axios';

@injectable()
export class AutoGitBackendServiceImpl implements AutoGitBackendService {
    stage: number
    config: ConfigFile | null
    pluginsInstalled: boolean
    constructor () {
        this.stage = STAGE.NOT_INIT;
        this.config = null;
        this.pluginsInstalled = false;
    }

    async getConfig(force = false) {
        if (!this.config || force) {
            try {
                this.config = require(getConfigFilePath());
            } catch (e) {}
        }
        return this.config;
    }

    async applyGitConfig() {
        const resp = {
            ok: false
        } as RemoteResponse;

        let cfg = await this.getConfig();

        if (!cfg) {
            resp.message = 'no valid git config';
            return resp;
        }

        if (this.stage >= STAGE.GIT_READY) {
            resp.message = 'already configured';
            resp.ok = true;
            return resp;
        }

        try {
            writeSSHKey(cfg.git.sshkey);
            await execShell([
                `git config --global user.name "${cfg.git.username}"`,
                `git config --global user.email "${cfg.git.email}"`,
                `git config --global core.sshCommand "ssh -o StrictHostKeyChecking=no"`
            ].join('\n'));
        } catch (e) {
            resp.message = 'exception';
            resp.data = e.toString();
            return resp;
        }
        this.stage = STAGE.GIT_READY;
        resp.message = 'configured success';
        resp.ok = true;
        return resp;
    }

    async startClone() {
        const resp = {
            ok: false
        } as RemoteResponse;

        if (this.stage < STAGE.GIT_READY) {
            resp.message = 'git is not configured';
            return resp;
        } else if (this.stage === STAGE.CLONE_ING) {
            resp.message = 'in progress';
            return resp;
        } else if (this.stage === STAGE.CLONED){
            resp.ok = true;
            return resp;
        }

        let cfg = await this.getConfig();

        if (!cfg || !cfg.git.repo) {
            resp.message = 'no repo url found';
            return resp;
        }

        this.stage = STAGE.CLONE_ING;

        try {
            await execShell(`git clone ${cfg.git.repo} --depth=1`, getProjectDir());
        } catch (e) {
            const errMsg = e.toString() || '';
            if (errMsg.indexOf('already exists and is not an empty directory.') > -1) {
                this.stage = STAGE.CLONED;
                resp.message = 'already cloned';
                resp.ok = true;
                return resp;
            }
            this.stage = STAGE.GIT_READY;
            resp.message = 'exception';
            resp.data = e.toString();
            return resp;
        }

        this.stage = STAGE.CLONED;
        resp.message = 'clone success';
        resp.ok = true;
        return resp;
    }

    async getStatus() {
        const ret = {
            stage: this.stage,
            projectDir: getProjectDir(),
            configReady: false,
            repo: {
                dir: '',
                url: ''
            },
            pluginsInstalled: this.pluginsInstalled
        };
        const cfg = await this.getConfig();
        ret.configReady = Boolean(cfg && cfg.git);
        if (cfg && cfg.git && cfg.git.repo) {
            ret.repo.url = cfg.git.repo;
            ret.repo.dir = getLocalGitDir(cfg.git.repo);
        }
        return ret;
    }
    async getDefaultWorkspace() {
        return getDefaultWorkspace();
    }

    async remoteAPI(options: any): Promise<RemoteResponse> {
        const ret:RemoteResponse = {
            ok: false,
            message: ''
        };

        const cfg = await this.getConfig();

        if (!cfg) {
            ret.message = 'invalid config';
            return ret;
        }

        if (!options.headers) {
            options.headers = {};
        }

        options.headers['authorization'] = cfg.website.token;
        options.headers['x-kesci-org'] = cfg.website.org._id || '',

        options.url = cfg.website.siteUrl + options.url;

        try {
            const resp = await axios(options);
            ret.data = resp.data;
            ret.ok = true;
        } catch (e) {
            ret.data = (e.response && e.response.data) ? e.response.data : '';
            ret.message = ret.data.message || e.toString();
        }

        return ret;
    }
    setPluginsInstalled() {
        this.pluginsInstalled = true;
    }
}
