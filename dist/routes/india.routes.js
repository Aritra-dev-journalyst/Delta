"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const india_client_1 = require("../clients/india.client");
const router = express_1.default.Router();
router.get("/orders", async (req, res) => {
    const r = await (0, india_client_1.indiaCall)("GET", "/v2/orders");
    res.json(r.data);
});
router.get("/fills", async (req, res) => {
    const r = await (0, india_client_1.indiaCall)("GET", "/v2/fills");
    res.json(r.data);
});
router.get("/positions", async (_, res) => {
    const r = await (0, india_client_1.indiaCall)("GET", "/v2/positions");
    res.json(r.data);
});
exports.default = router;
