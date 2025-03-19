export declare const AutoGitBackendService: unique symbol;
import { ConfigFile } from '../shared';
export interface AutoGitBackendService {
    setPluginsInstalled(): any;
    getConfig(): Promise<ConfigFile | null>;
    applyGitConfig(): Promise<RemoteResponse>;
    startClone(): Promise<RemoteResponse>;
    getStatus(): Promise<StatusResponse>;
    getDefaultWorkspace(): Promise<string>;
    remoteAPI(opts: any): Promise<RemoteResponse>;
}
export interface StatusResponse {
    stage: number;
    projectDir: string;
    configReady: boolean;
    pluginsInstalled: boolean;
    repo: {
        url?: string;
        dir?: string;
    };
}
export interface RemoteResponse {
    ok: boolean;
    message?: string;
    data?: any;
}
//# sourceMappingURL=protocol.d.ts.map