import { ResolvedConfig, InlineConfig } from 'vite';
export interface BuildOptions {
    /**
     * Vite options applied only to the client build
     */
    clientOptions?: InlineConfig;
    /**
     * Vite options applied only to the server build
     */
    serverOptions?: InlineConfig & {
        /**
         * Extra properties to include in the generated server package.json,
         * or 'false' to avoid generating it.
         */
        packageJson?: Record<string, unknown> | false;
    };
}
export interface ViteSsrPluginOptions {
    /**
     * Path to entry index.html
     * @default '<root>/index.html'
     */
    input?: string;
    /**
     * ID of the app container in index.html. Defaults to "app".
     */
    containerId?: string;
    build?: BuildOptions & {
        /**
         * Keep the index.html generated in the client build
         * @default false
         */
        keepIndexHtml?: boolean;
    };
    excludeSsrComponents?: Array<RegExp>;
    features?: {
        /**
         * Use '@apollo/client' renderer if present
         * @default true
         */
        reactApolloRenderer?: boolean;
    };
}
export declare const INDEX_HTML = "index.html";
export declare function getPluginOptions(viteConfig: ResolvedConfig): ViteSsrPluginOptions;
export declare function resolveViteConfig(mode?: string): Promise<Readonly<Omit<import("vite").UserConfig, "plugins" | "assetsInclude" | "optimizeDeps" | "worker"> & {
    configFile: string | undefined;
    configFileDependencies: string[];
    inlineConfig: InlineConfig;
    root: string;
    base: string;
    publicDir: string;
    cacheDir: string;
    command: "build" | "serve";
    mode: string;
    isWorker: boolean;
    isProduction: boolean;
    env: Record<string, any>;
    resolve: Required<import("vite").ResolveOptions> & {
        alias: import("vite").Alias[];
    };
    plugins: readonly import("vite").Plugin[];
    server: import("vite").ResolvedServerOptions;
    build: import("vite").ResolvedBuildOptions;
    preview: import("vite").ResolvedPreviewOptions;
    ssr: import("vite").ResolvedSSROptions;
    assetsInclude: (file: string) => boolean;
    logger: import("vite").Logger;
    createResolver: (options?: Partial<import("vite").InternalResolveOptions> | undefined) => import("vite").ResolveFn;
    optimizeDeps: import("vite").DepOptimizationOptions;
    worker: import("vite").ResolveWorkerOptions;
    appType: import("vite").AppType;
    experimental: import("vite").ExperimentalOptions;
} & import("vite").PluginHookUtils>>;
export declare function getEntryPoint(config?: ResolvedConfig, indexHtml?: string): Promise<string>;
