"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indiaCall = void 0;
const axios_1 = __importDefault(require("axios"));
const india_config_1 = require("../config/india.config");
const signer_1 = require("../utils/signer");
async function indiaCall(method, path, body) {
    const { timestamp, signature } = (0, signer_1.signRequest)(method, path, india_config_1.INDIA_CONFIG.API_SECRET, body);
    const headers = {
        "api-key": india_config_1.INDIA_CONFIG.API_KEY,
        timestamp,
        signature,
        "Content-Type": "application/json",
    };
    if (india_config_1.INDIA_CONFIG.PASSPHRASE) {
        headers.passphrase = india_config_1.INDIA_CONFIG.PASSPHRASE;
    }
    return (0, axios_1.default)({
        method,
        url: `${india_config_1.INDIA_CONFIG.BASE_URL}${path}`,
        headers,
        data: body,
    });
}
exports.indiaCall = indiaCall;
