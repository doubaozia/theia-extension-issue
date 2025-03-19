"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@theia/core");
const browser_1 = require("@theia/core/lib/browser");
const inversify_1 = require("@theia/core/shared/inversify");
const protocol_1 = require("../common/protocol");
const constants_1 = require("../common/constants");
const auto_git_contribution_1 = require("./auto-git-contribution");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(core_1.CommandContribution).to(auto_git_contribution_1.AutoGitCommandContribution).inSingletonScope();
    bind(protocol_1.AutoGitBackendService).toDynamicValue(ctx => {
        const connection = ctx.container.get(browser_1.WebSocketConnectionProvider);
        return connection.createProxy(constants_1.AUTO_GIT_BACKEND_PATH);
    }).inSingletonScope();
});
//# sourceMappingURL=auto-git-frontend-module.js.map