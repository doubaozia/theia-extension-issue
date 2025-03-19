import { CommandContribution} from '@theia/core';
import { WebSocketConnectionProvider } from '@theia/core/lib/browser';
import { ContainerModule } from '@theia/core/shared/inversify';
import { AutoGitBackendService } from '../common/protocol';
import { AUTO_GIT_BACKEND_PATH } from '../common/constants';
import { AutoGitCommandContribution } from './auto-git-contribution';

export default new ContainerModule(bind => {
    bind(CommandContribution).to(AutoGitCommandContribution).inSingletonScope();

    bind(AutoGitBackendService).toDynamicValue(ctx => {
        const connection = ctx.container.get(WebSocketConnectionProvider);
        return connection.createProxy<AutoGitBackendService>(AUTO_GIT_BACKEND_PATH);
    }).inSingletonScope();

});
