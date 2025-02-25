"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHtmlDocument = exports.renderPreloadLinks = exports.findDependencies = void 0;
function findDependencies(modules, manifest) {
    const files = new Set();
    for (const id of modules || []) {
        for (const file of manifest[id] || []) {
            files.add(file);
        }
    }
    return [...files];
}
exports.findDependencies = findDependencies;
function renderPreloadLinks(files) {
    let link = '';
    for (const file of files || []) {
        if (file.endsWith('.js')) {
            link += `<link rel="modulepreload" crossorigin href="${file}">`;
        }
        else if (file.endsWith('.css')) {
            link += `<link rel="stylesheet" href="${file}">`;
        }
    }
    return link;
}
exports.renderPreloadLinks = renderPreloadLinks;
// @ts-ignore
const containerId = __CONTAINER_ID__;
const containerRE = new RegExp(`<div id="${containerId}"([\\s\\w\\-"'=[\\]]*)><\\/div>`);
function buildHtmlDocument(template, { htmlAttrs, bodyAttrs, headTags, body, initialState }) {
    // @ts-ignore
    if (__DEV__) {
        if (template.indexOf(`id="${containerId}"`) === -1) {
            console.warn(`[SSR] Container with id "${containerId}" was not found in index.html`);
        }
    }
    if (htmlAttrs) {
        template = template.replace('<html', `<html ${htmlAttrs} `);
    }
    if (bodyAttrs) {
        template = template.replace('<body', `<body ${bodyAttrs} `);
    }
    if (headTags) {
        template = template.replace('</head>', `\n${headTags}\n</head>`);
    }
    return template.replace(containerRE, 
    // Use function parameter here to avoid replacing `$1` in body or initialState.
    // https://github.com/frandiox/vite-ssr/issues/123
    (_, d1) => `<div id="${containerId}" data-server-rendered="true"${d1 || ''}>${body || ''}</div>\n\n  <script>window.__INITIAL_STATE__=${initialState || "'{}'"}</script>`);
}
exports.buildHtmlDocument = buildHtmlDocument;
