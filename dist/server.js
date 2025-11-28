"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const global_routes_1 = __importDefault(require("./routes/global.routes"));
const india_routes_1 = __importDefault(require("./routes/india.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/global", global_routes_1.default);
app.use("/api/india", india_routes_1.default);
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
