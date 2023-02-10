"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClientRedirect = exports.useSsrResponse = void 0;
const defer_1 = require("vite-ssr/src/utils/defer");
const isRedirect = ({ status = 0 }) => status >= 300 && status < 400;
function useSsrResponse() {
    const deferred = (0, defer_1.defer)();
    let response = {};
    const writeResponse = (params) => {
        Object.assign(response, params);
        if (isRedirect(params)) {
            // Stop waiting for rendering when redirecting
            deferred.resolve(response);
        }
    };
    return {
        deferred,
        response,
        writeResponse,
        isRedirect: () => isRedirect(response),
        redirect: (location, status = 302) => writeResponse({ headers: { location }, status }),
    };
}
exports.useSsrResponse = useSsrResponse;
const externalRedirect = (location) => {
    window.location.href = location;
};
function useClientRedirect(spaRedirect = externalRedirect) {
    return {
        writeResponse: () => console.warn('[SSR] Do not call writeResponse in browser'),
        redirect: (location, status) => {
            return location.startsWith('/')
                ? spaRedirect(location)
                : externalRedirect(location);
        },
    };
}
exports.useClientRedirect = useClientRedirect;
