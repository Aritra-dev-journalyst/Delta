"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRequest = void 0;
const crypto_1 = __importDefault(require("crypto"));
function signRequest(method, path, apiSecret, body) {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const payload = body ? JSON.stringify(body) : "";
    const message = method + timestamp + path + payload;
    const signature = crypto_1.default
        .createHmac("sha256", apiSecret)
        .update(message)
        .digest("hex");
    return { timestamp, signature };
}
exports.signRequest = signRequest;
