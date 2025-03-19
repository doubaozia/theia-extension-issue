export interface ConfigFile {
    git: {
        username: string;
        email: string;
        sshkey: string;
        repo: string;
    };
    website: {
        siteUrl: string;
        token: string;
        org: {
            _id: string;
            Name: string;
            ShortName: string;
        };
        lab: {
            _id: string;
            Title: string;
        };
        user: {
            _id: string;
            Name: string;
        };
    };
    opts: {
        disableDownload: boolean;
    };
    plugins: {
        ID: string;
        DisplayName: string;
    }[];
}
//# sourceMappingURL=shared.d.ts.map