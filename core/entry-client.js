import { deserializeState } from 'vite-ssr/utils/deserialize-state';
import { useClientRedirect } from 'vite-ssr/utils/response';
export const viteSSR = async function viteSSR(options, hook) {
    if (!hook && typeof options === 'function') {
        hook = options;
        options = {};
    }
    const { url = new URL(window.location.href), transformState = deserializeState, spaRedirect, } = (options || {});
    // Deserialize the state included in the DOM
    const initialState = await transformState(
    // @ts-ignore
    window.__INITIAL_STATE__, deserializeState);
    // Browser redirect utilities
    const { redirect, writeResponse } = useClientRedirect(spaRedirect);
    const context = {
        url,
        isClient: true,
        initialState: initialState || {},
        writeResponse,
        redirect,
    };
    // Main hook / component
    hook && (await hook(context));
    return context;
};
export default viteSSR;
