"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalCall = void 0;
const axios_1 = __importDefault(require("axios"));
const global_config_1 = require("../config/global.config");
const signer_1 = require("../utils/signer");
async function globalCall(method, path, body) {
    const { timestamp, signature } = (0, signer_1.signRequest)(method, path, global_config_1.GLOBAL_CONFIG.API_SECRET, body);
    const headers = {
        "api-key": global_config_1.GLOBAL_CONFIG.API_KEY,
        timestamp,
        signature,
        "Content-Type": "application/json",
    };
    if (global_config_1.GLOBAL_CONFIG.PASSPHRASE) {
        headers.passphrase = global_config_1.GLOBAL_CONFIG.PASSPHRASE;
    }
    return (0, axios_1.default)({
        method,
        url: `${global_config_1.GLOBAL_CONFIG.BASE_URL}${path}`,
        headers,
        data: body,
    });
}
exports.globalCall = globalCall;
