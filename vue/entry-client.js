import { createSSRApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import createClientContext from 'vite-ssr/core/entry-client.js';
import { getFullPath, withoutSuffix } from 'vite-ssr/utils/route';
import { addPagePropsGetterToRoutes } from 'vite-ssr/vue/utils';
import { provideContext } from 'vite-ssr/vue/components.js';
export { ClientOnly, useContext } from 'vite-ssr/vue/components.js';
export const viteSSR = async function viteSSR(App, { routes, base, routerOptions = {}, pageProps = { passToPage: true }, debug = {}, ...options }, hook) {
    if (pageProps && pageProps.passToPage) {
        addPagePropsGetterToRoutes(routes);
    }
    const app = createSSRApp(App);
    const url = new URL(window.location.href);
    const routeBase = base && withoutSuffix(base({ url }), '/');
    const router = createRouter({
        ...routerOptions,
        history: createWebHistory(routeBase),
        routes: routes,
    });
    const context = await createClientContext({
        ...options,
        url,
        spaRedirect: (location) => router.push(location),
    });
    provideContext(app, context);
    let entryRoutePath;
    let isFirstRoute = true;
    router.beforeEach((to) => {
        if (isFirstRoute || (entryRoutePath && entryRoutePath === to.path)) {
            // The first route is rendered in the server and its state is provided globally.
            isFirstRoute = false;
            entryRoutePath = to.path;
            to.meta.state = context.initialState;
        }
    });
    if (hook) {
        await hook({
            app,
            router,
            initialRoute: router.resolve(getFullPath(url, routeBase)),
            ...context,
        });
    }
    app.use(router);
    if (debug.mount !== false) {
        // this will hydrate the app
        await router.isReady();
        // @ts-ignore
        app.mount(`#${__CONTAINER_ID__}`, true);
        // it is possible to debug differences of SSR / Hydrated app state
        // by adding a timeout between rendering the SSR version and hydrating it later
        // window.setTimeout(() => {
        //   console.log('The app has now hydrated');
        //   router.isReady().then(() => {
        //     app.mount('#app', true);
        //   });
        // }, 5000);
    }
};
export default viteSSR;
