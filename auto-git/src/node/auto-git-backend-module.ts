import { ConnectionHandler, JsonRpcConnectionHandler } from '@theia/core';
import { ContainerModule } from '@theia/core/shared/inversify';
import { AutoGitBackendService } from '../common/protocol';
import { AUTO_GIT_BACKEND_PATH } from '../common/constants';
import { AutoGitBackendServiceImpl } from './auto-git-backend-service';

export default new ContainerModule(bind => {
    bind(AutoGitBackendService).to(AutoGitBackendServiceImpl).inSingletonScope()
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new JsonRpcConnectionHandler(AUTO_GIT_BACKEND_PATH, () => {
            return ctx.container.get<AutoGitBackendService>(AutoGitBackendService);
        })
    ).inSingletonScope();
});
