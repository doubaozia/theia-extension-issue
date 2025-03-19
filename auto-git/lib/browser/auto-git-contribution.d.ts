import { CommandContribution, CommandRegistry } from '@theia/core/lib/common';
import { MessageService } from '@theia/core';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import { TerminalFrontendContribution } from '@theia/terminal/lib/browser/terminal-frontend-contribution';
import { AutoGitBackendService } from '../common/protocol';
import { HostedPluginSupport } from '@theia/plugin-ext/lib/hosted/browser/hosted-plugin';
import { PluginServer } from '@theia/plugin-ext/lib/common';
import { OVSXClientProvider } from '@theia/vsx-registry/lib/common/ovsx-client-provider';
export declare class AutoGitCommandContribution implements CommandContribution {
    private readonly autoGitBackendService;
    private readonly messageService;
    protected readonly workspaceService: WorkspaceService;
    protected readonly terminalContribution: TerminalFrontendContribution;
    protected readonly commandRegistry: CommandRegistry;
    private readonly pluginServer;
    private readonly pluginSupport;
    private readonly ovsxClientProvider;
    constructor(autoGitBackendService: AutoGitBackendService, messageService: MessageService, workspaceService: WorkspaceService, terminalContribution: TerminalFrontendContribution, commandRegistry: CommandRegistry, pluginServer: PluginServer, pluginSupport: HostedPluginSupport, ovsxClientProvider: OVSXClientProvider);
    registerCommands(registry: CommandRegistry): void;
    setupGitLoop(): Promise<void>;
}
//# sourceMappingURL=auto-git-contribution.d.ts.map