import express from "express";
import { indiaCall } from "../clients/india.client";

const router = express.Router();

router.get("/ping", (_, res) => res.send("Global route working ✅"));

router.get("/user", async (_req, res) => {
    try {
        const response = await indiaCall("GET", "/v2/user");
        res.json(response.data);
    } catch (err: any) {
        res.status(500).json({
            error: err.response?.data || err.message
        });
    }
});


router.get("/orders", async (_req, res) => {
    try {
        const response = await indiaCall("GET", "/v2/orders");
        res.json(response.data);
    } catch (err: any) {
        res.status(500).json({
            error: err.response?.data || err.message
        });
    }
});

router.get("/orders/history", async (_req, res) => {
    try {
        const response = await indiaCall("GET", "/v2/orders/history");
        res.json(response.data);
    } catch (err: any) {
        res.status(500).json({
            error: err.response?.data || err.message
        });
    }
});

router.get("/fills", async (_req, res) => {
    try {
        const response = await indiaCall("GET", "/v2/fills");
        res.json(response.data);
    } catch (err: any) {
        res.status(500).json({ error: err.response?.data || err.message });
    }
});

router.get("/positions/margined", async (_req, res) => {
    try {
        const response = await indiaCall("GET", "/v2/positions/margined");
        res.json(response.data);
    } catch (err: any) {
        res.status(500).json({ error: err.response?.data || err.message });
    }
});

router.get("/balances", async (_req, res) => {
    try {
        const response = await indiaCall("GET", "/v2/wallet/balances");
        res.json(response.data);
    } catch (err: any) {
        res.status(500).json({ error: err.response?.data || err.message });
    }
});

router.get("/transactions", async (_req, res) => {
    try {
        const response = await indiaCall("GET", "/v2/wallet/transactions");
        res.json(response.data);
    } catch (err: any) {
        res.status(500).json({ error: err.response?.data || err.message });
    }
});


export default router;
