"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viteSSR = void 0;
const deserialize_state_1 = require("dist/utils/deserialize-state");
const response_1 = require("dist/utils/response");
const viteSSR = async function viteSSR(options, hook) {
    if (!hook && typeof options === 'function') {
        hook = options;
        options = {};
    }
    const { url = new URL(window.location.href), transformState = deserialize_state_1.deserializeState, spaRedirect, } = (options || {});
    // Deserialize the state included in the DOM
    const initialState = await transformState(
    // @ts-ignore
    window.__INITIAL_STATE__, deserialize_state_1.deserializeState);
    // Browser redirect utilities
    const { redirect, writeResponse } = (0, response_1.useClientRedirect)(spaRedirect);
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
exports.viteSSR = viteSSR;
exports.default = exports.viteSSR;
