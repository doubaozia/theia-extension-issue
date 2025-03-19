import { CommandContribution, CommandRegistry} from '@theia/core/lib/common';
import { MessageService } from '@theia/core';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import { TerminalFrontendContribution } from '@theia/terminal/lib/browser/terminal-frontend-contribution';

import { inject, injectable } from '@theia/core/shared/inversify';

import { AutoGitBackendService } from '../common/protocol';

import { HostedPluginSupport } from '@theia/plugin-ext/lib/hosted/browser/hosted-plugin';
import { PluginServer } from '@theia/plugin-ext/lib/common';
import { OVSXClientProvider } from '@theia/vsx-registry/lib/common/ovsx-client-provider';

@injectable()
export class AutoGitCommandContribution implements CommandContribution {

    constructor(
        @inject(AutoGitBackendService) private readonly autoGitBackendService: AutoGitBackendService,
        @inject(MessageService) private readonly messageService: MessageService,
        @inject(WorkspaceService) protected readonly workspaceService: WorkspaceService,
        @inject(TerminalFrontendContribution) protected readonly terminalContribution: TerminalFrontendContribution,
        @inject(CommandRegistry) protected readonly commandRegistry: CommandRegistry,
        @inject(PluginServer) private readonly pluginServer: PluginServer,
        @inject(HostedPluginSupport) private readonly pluginSupport: HostedPluginSupport,
        @inject(OVSXClientProvider) private readonly ovsxClientProvider: OVSXClientProvider
    ) {
        this.setupGitLoop();
     }

    registerCommands(registry: CommandRegistry): void {}

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
    // there is also other logics
}
