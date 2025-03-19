"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@theia/core");
const inversify_1 = require("@theia/core/shared/inversify");
const protocol_1 = require("../common/protocol");
const constants_1 = require("../common/constants");
const auto_git_backend_service_1 = require("./auto-git-backend-service");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(protocol_1.AutoGitBackendService).to(auto_git_backend_service_1.AutoGitBackendServiceImpl).inSingletonScope();
    bind(core_1.ConnectionHandler).toDynamicValue(ctx => new core_1.JsonRpcConnectionHandler(constants_1.AUTO_GIT_BACKEND_PATH, () => {
        return ctx.container.get(protocol_1.AutoGitBackendService);
    })).inSingletonScope();
});
//# sourceMappingURL=auto-git-backend-module.js.map