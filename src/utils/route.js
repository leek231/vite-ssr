"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullPath = exports.createUrl = exports.withoutSuffix = exports.withSuffix = exports.withoutPrefix = exports.withPrefix = void 0;
const S = '/';
function withPrefix(string, prefix) {
    return string.startsWith(prefix) ? string : prefix + string;
}
exports.withPrefix = withPrefix;
function withoutPrefix(string, prefix) {
    return string.startsWith(prefix) ? string.slice(prefix.length) : string;
}
exports.withoutPrefix = withoutPrefix;
function withSuffix(string, suffix) {
    return string.endsWith(suffix) ? string : string + suffix;
}
exports.withSuffix = withSuffix;
function withoutSuffix(string, suffix) {
    return string.endsWith(suffix) ? string.slice(0, -1 * suffix.length) : string;
}
exports.withoutSuffix = withoutSuffix;
function createUrl(urlLike) {
    if (typeof urlLike === 'string' && !(urlLike || '').includes('://')) {
        urlLike = 'http://e.g' + withPrefix(urlLike, S);
    }
    return new URL(urlLike.toString());
}
exports.createUrl = createUrl;
function getFullPath(url, routeBase) {
    url = createUrl(url);
    url.pathname = withSuffix(url.pathname, S);
    let fullPath = withoutPrefix(url.href, url.origin);
    if (routeBase) {
        routeBase = withSuffix(withPrefix(routeBase, S), S);
        if (fullPath.indexOf(routeBase) === 0) {
            fullPath = withPrefix(fullPath.replace(routeBase, ''), S);
        }
    }
    return fullPath;
}
exports.getFullPath = getFullPath;
