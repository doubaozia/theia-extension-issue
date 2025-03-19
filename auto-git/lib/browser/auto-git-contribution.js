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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoGitCommandContribution = void 0;
const common_1 = require("@theia/core/lib/common");
const core_1 = require("@theia/core");
const workspace_service_1 = require("@theia/workspace/lib/browser/workspace-service");
const terminal_frontend_contribution_1 = require("@theia/terminal/lib/browser/terminal-frontend-contribution");
const inversify_1 = require("@theia/core/shared/inversify");
const protocol_1 = require("../common/protocol");
const hosted_plugin_1 = require("@theia/plugin-ext/lib/hosted/browser/hosted-plugin");
const common_2 = require("@theia/plugin-ext/lib/common");
const ovsx_client_provider_1 = require("@theia/vsx-registry/lib/common/ovsx-client-provider");
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
//# sourceMappingURL=auto-git-contribution.js.map