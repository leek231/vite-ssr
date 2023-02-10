import React from 'vite-ssr/react/index';
import ReactDOM from 'react-dom';
import createClientContext from 'vite-ssr/core/entry-client.js';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { withoutSuffix } from 'vite-ssr/utils/route';
import { createRouter } from 'vite-ssr/react/utils';
import { provideContext } from 'vite-ssr/react/components.js';
export { ClientOnly, useContext } from 'vite-ssr/react/components.js';
export const viteSSR = async function (App, { routes, base, suspenseFallback, PropsProvider, pageProps, debug = {}, styleCollector, ...options }, hook) {
    const url = new URL(window.location.href);
    const routeBase = base && withoutSuffix(base({ url }), '/');
    const ctx = await createClientContext({
        ...options,
        url,
        spaRedirect: (location) => {
            const navigate = useNavigate();
            React.useEffect(() => navigate(location), [navigate]);
        },
    });
    const context = ctx;
    context.router = createRouter({
        routes,
        base,
        initialState: context.initialState,
        pagePropsOptions: pageProps,
        PropsProvider,
    });
    if (hook) {
        await hook(context);
    }
    let app = React.createElement(HelmetProvider, {}, React.createElement(
    // @ts-ignore
    BrowserRouter, { basename: routeBase }, React.createElement(React.Suspense, { fallback: suspenseFallback || '' }, provideContext(React.createElement(App, context), context))));
    const styles = styleCollector && (await styleCollector(context));
    if (styles && styles.provide) {
        app = styles.provide(app);
    }
    if (debug.mount !== false) {
        // @ts-ignore
        const el = document.getElementById(__CONTAINER_ID__);
        styles && styles.cleanup && styles.cleanup();
        // @ts-ignore
        __DEV__ ? ReactDOM.render(app, el) : ReactDOM.hydrate(app, el);
    }
};
export default viteSSR;
