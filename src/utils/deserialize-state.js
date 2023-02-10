"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeState = void 0;
function deserializeState(state) {
    try {
        return JSON.parse(state || '{}');
    }
    catch (error) {
        console.error('[SSR] On state deserialization -', error, state);
        return {};
    }
}
exports.deserializeState = deserializeState;
