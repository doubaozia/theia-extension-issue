"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoGitBackendServiceImpl = void 0;
const inversify_1 = require("@theia/core/shared/inversify");
const utils_1 = require("./utils");
const constants_1 = require("../common/constants");
const axios_1 = require("axios");
let AutoGitBackendServiceImpl = class AutoGitBackendServiceImpl {
    constructor() {
        this.stage = constants_1.STAGE.NOT_INIT;
        this.config = null;
        this.pluginsInstalled = false;
    }
    async getConfig(force = false) {
        if (!this.config || force) {
            try {
                this.config = require((0, utils_1.getConfigFilePath)());
            }
            catch (e) { }
        }
        return this.config;
    }
    async applyGitConfig() {
        const resp = {
            ok: false
        };
        let cfg = await this.getConfig();
        if (!cfg) {
            resp.message = 'no valid git config';
            return resp;
        }
        if (this.stage >= constants_1.STAGE.GIT_READY) {
            resp.message = 'already configured';
            resp.ok = true;
            return resp;
        }
        try {
            (0, utils_1.writeSSHKey)(cfg.git.sshkey);
            await (0, utils_1.execShell)([
                `git config --global user.name "${cfg.git.username}"`,
                `git config --global user.email "${cfg.git.email}"`,
                `git config --global core.sshCommand "ssh -o StrictHostKeyChecking=no"`
            ].join('\n'));
        }
        catch (e) {
            resp.message = 'exception';
            resp.data = e.toString();
            return resp;
        }
        this.stage = constants_1.STAGE.GIT_READY;
        resp.message = 'configured success';
        resp.ok = true;
        return resp;
    }
    async startClone() {
        const resp = {
            ok: false
        };
        if (this.stage < constants_1.STAGE.GIT_READY) {
            resp.message = 'git is not configured';
            return resp;
        }
        else if (this.stage === constants_1.STAGE.CLONE_ING) {
            resp.message = 'in progress';
            return resp;
        }
        else if (this.stage === constants_1.STAGE.CLONED) {
            resp.ok = true;
            return resp;
        }
        let cfg = await this.getConfig();
        if (!cfg || !cfg.git.repo) {
            resp.message = 'no repo url found';
            return resp;
        }
        this.stage = constants_1.STAGE.CLONE_ING;
        try {
            await (0, utils_1.execShell)(`git clone ${cfg.git.repo} --depth=1`, (0, utils_1.getProjectDir)());
        }
        catch (e) {
            const errMsg = e.toString() || '';
            if (errMsg.indexOf('already exists and is not an empty directory.') > -1) {
                this.stage = constants_1.STAGE.CLONED;
                resp.message = 'already cloned';
                resp.ok = true;
                return resp;
            }
            this.stage = constants_1.STAGE.GIT_READY;
            resp.message = 'exception';
            resp.data = e.toString();
            return resp;
        }
        this.stage = constants_1.STAGE.CLONED;
        resp.message = 'clone success';
        resp.ok = true;
        return resp;
    }
    async getStatus() {
        const ret = {
            stage: this.stage,
            projectDir: (0, utils_1.getProjectDir)(),
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
            ret.repo.dir = (0, utils_1.getLocalGitDir)(cfg.git.repo);
        }
        return ret;
    }
    async getDefaultWorkspace() {
        return (0, utils_1.getDefaultWorkspace)();
    }
    async remoteAPI(options) {
        const ret = {
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
            const resp = await (0, axios_1.default)(options);
            ret.data = resp.data;
            ret.ok = true;
        }
        catch (e) {
            ret.data = (e.response && e.response.data) ? e.response.data : '';
            ret.message = ret.data.message || e.toString();
        }
        return ret;
    }
    setPluginsInstalled() {
        this.pluginsInstalled = true;
    }
};
exports.AutoGitBackendServiceImpl = AutoGitBackendServiceImpl;
exports.AutoGitBackendServiceImpl = AutoGitBackendServiceImpl = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], AutoGitBackendServiceImpl);
//# sourceMappingURL=auto-git-backend-service.js.map