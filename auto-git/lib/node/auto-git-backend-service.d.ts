import { AutoGitBackendService, RemoteResponse } from '../common/protocol';
import { ConfigFile } from '../shared';
export declare class AutoGitBackendServiceImpl implements AutoGitBackendService {
    stage: number;
    config: ConfigFile | null;
    pluginsInstalled: boolean;
    constructor();
    getConfig(force?: boolean): Promise<ConfigFile | null>;
    applyGitConfig(): Promise<RemoteResponse>;
    startClone(): Promise<RemoteResponse>;
    getStatus(): Promise<{
        stage: number;
        projectDir: string;
        configReady: boolean;
        repo: {
            dir: string;
            url: string;
        };
        pluginsInstalled: boolean;
    }>;
    getDefaultWorkspace(): Promise<string>;
    remoteAPI(options: any): Promise<RemoteResponse>;
    setPluginsInstalled(): void;
}
//# sourceMappingURL=auto-git-backend-service.d.ts.map