import { InlineConfig } from 'vite';
import { BuildOptions } from '../config';
declare const _default: (inlineBuildOptions?: BuildOptions, _viteConfig?: Readonly<Omit<import("vite").UserConfig, "plugins" | "assetsInclude" | "optimizeDeps" | "worker"> & {
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
} & import("vite").PluginHookUtils> | undefined) => Promise<unknown>;
export = _default;
