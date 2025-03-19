"use strict";
(self["webpackChunkbrowser_app"] = self["webpackChunkbrowser_app"] || []).push([["auto-git_lib_browser_auto-git-frontend-module_js"],{

/***/ "../auto-git/lib/browser/auto-git-contribution.js":
/*!********************************************************!*\
  !*** ../auto-git/lib/browser/auto-git-contribution.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutoGitCommandContribution = void 0;
const common_1 = __webpack_require__(/*! @theia/core/lib/common */ "../node_modules/@theia/core/lib/common/index.js");
const core_1 = __webpack_require__(/*! @theia/core */ "../node_modules/@theia/core/lib/common/index.js");
const workspace_service_1 = __webpack_require__(/*! @theia/workspace/lib/browser/workspace-service */ "../node_modules/@theia/workspace/lib/browser/workspace-service.js");
const terminal_frontend_contribution_1 = __webpack_require__(/*! @theia/terminal/lib/browser/terminal-frontend-contribution */ "../node_modules/@theia/terminal/lib/browser/terminal-frontend-contribution.js");
const inversify_1 = __webpack_require__(/*! @theia/core/shared/inversify */ "../node_modules/@theia/core/shared/inversify/index.js");
const protocol_1 = __webpack_require__(/*! ../common/protocol */ "../auto-git/lib/common/protocol.js");
const hosted_plugin_1 = __webpack_require__(/*! @theia/plugin-ext/lib/hosted/browser/hosted-plugin */ "../node_modules/@theia/plugin-ext/lib/hosted/browser/hosted-plugin.js");
const common_2 = __webpack_require__(/*! @theia/plugin-ext/lib/common */ "../node_modules/@theia/plugin-ext/lib/common/index.js");
const ovsx_client_provider_1 = __webpack_require__(/*! @theia/vsx-registry/lib/common/ovsx-client-provider */ "../node_modules/@theia/vsx-registry/lib/common/ovsx-client-provider.js");
let AutoGitCommandContribution = class AutoGitCommandContribution {
    constructor(autoGitBackendService, messageService, workspaceService, terminalContribution, commandRegistry, pluginServer, pluginSupport, ovsxClientProvider) {
        this.autoGitBackendService = autoGitBackendService;
        this.messageService = messageService;
        this.workspaceService = workspaceService;
        this.terminalContribution = terminalContribution;
        this.commandRegistry = commandRegistry;
        this.pluginServer = pluginServer;
        this.pluginSupport = pluginSupport;
        this.ovsxClientProvider = ovsxClientProvider;
        this.setupGitLoop();
    }
    registerCommands(registry) { }
    async setupGitLoop() {
        console.log(this.autoGitBackendService);
        console.log(this.messageService);
        console.log(this.workspaceService);
        console.log(this.terminalContribution);
        console.log(this.commandRegistry);
        console.log(this.pluginServer);
        console.log(this.pluginSupport);
        console.log(this.ovsxClientProvider);
    }
};
exports.AutoGitCommandContribution = AutoGitCommandContribution;
exports.AutoGitCommandContribution = AutoGitCommandContribution = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(protocol_1.AutoGitBackendService)),
    __param(1, (0, inversify_1.inject)(core_1.MessageService)),
    __param(2, (0, inversify_1.inject)(workspace_service_1.WorkspaceService)),
    __param(3, (0, inversify_1.inject)(terminal_frontend_contribution_1.TerminalFrontendContribution)),
    __param(4, (0, inversify_1.inject)(common_1.CommandRegistry)),
    __param(5, (0, inversify_1.inject)(common_2.PluginServer)),
    __param(6, (0, inversify_1.inject)(hosted_plugin_1.HostedPluginSupport)),
    __param(7, (0, inversify_1.inject)(ovsx_client_provider_1.OVSXClientProvider)),
    __metadata("design:paramtypes", [Object, core_1.MessageService,
        workspace_service_1.WorkspaceService,
        terminal_frontend_contribution_1.TerminalFrontendContribution,
        common_1.CommandRegistry, Object, hosted_plugin_1.HostedPluginSupport, Function])
], AutoGitCommandContribution);


/***/ }),

/***/ "../auto-git/lib/browser/auto-git-frontend-module.js":
/*!***********************************************************!*\
  !*** ../auto-git/lib/browser/auto-git-frontend-module.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @theia/core */ "../node_modules/@theia/core/lib/common/index.js");
const browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "../node_modules/@theia/core/lib/browser/index.js");
const inversify_1 = __webpack_require__(/*! @theia/core/shared/inversify */ "../node_modules/@theia/core/shared/inversify/index.js");
const protocol_1 = __webpack_require__(/*! ../common/protocol */ "../auto-git/lib/common/protocol.js");
const constants_1 = __webpack_require__(/*! ../common/constants */ "../auto-git/lib/common/constants.js");
const auto_git_contribution_1 = __webpack_require__(/*! ./auto-git-contribution */ "../auto-git/lib/browser/auto-git-contribution.js");
exports["default"] = new inversify_1.ContainerModule(bind => {
    bind(core_1.CommandContribution).to(auto_git_contribution_1.AutoGitCommandContribution).inSingletonScope();
    bind(protocol_1.AutoGitBackendService).toDynamicValue(ctx => {
        const connection = ctx.container.get(browser_1.WebSocketConnectionProvider);
        return connection.createProxy(constants_1.AUTO_GIT_BACKEND_PATH);
    }).inSingletonScope();
});


/***/ }),

/***/ "../auto-git/lib/common/constants.js":
/*!*******************************************!*\
  !*** ../auto-git/lib/common/constants.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AUTO_GIT_BACKEND_PATH = exports.STAGE = void 0;
exports.STAGE = {
    NOT_INIT: 0,
    GIT_READY: 1,
    CLONE_ING: 2,
    CLONED: 3
};
exports.AUTO_GIT_BACKEND_PATH = '/services/mw-auto-git';


/***/ }),

/***/ "../auto-git/lib/common/protocol.js":
/*!******************************************!*\
  !*** ../auto-git/lib/common/protocol.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutoGitBackendService = void 0;
exports.AutoGitBackendService = Symbol('AutoGitBackendService');
;


/***/ })

}]);
//# sourceMappingURL=auto-git_lib_browser_auto-git-frontend-module_js.js.map