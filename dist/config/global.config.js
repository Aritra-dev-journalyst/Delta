"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLOBAL_CONFIG = void 0;
exports.GLOBAL_CONFIG = {
    BASE_URL: "https://testnet-api.delta.exchange",
    API_KEY: process.env.GLOBAL_API_KEY,
    API_SECRET: process.env.GLOBAL_API_SECRET,
    PASSPHRASE: process.env.GLOBAL_PASSPHRASE || "",
};
