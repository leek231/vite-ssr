"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSsrServer = exports.startServer = void 0;
const server_1 = require("src/dev/server");
Object.defineProperty(exports, "createSsrServer", { enumerable: true, get: function () { return server_1.createSsrServer; } });
const startServer = (options) => (0, server_1.createSsrServer)(options).then((server) => server.listen());
exports.startServer = startServer;
