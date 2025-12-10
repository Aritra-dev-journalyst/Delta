import express from "express";
import { globalCall } from "../clients/global.client";

const router = express.Router();

router.get("/ping", (_, res) => res.send("Global route working ✅"));

router.get("/user", async (_req, res) => {
    try {
        const response = await globalCall("GET", "/v2/user");
        res.json(response);
    } catch (err: any) {
        res.status(500).json({
            error: err.response?.data || err.message
        });
    }
});


router.get("/orders", async (_req, res) => {
    try {
        const response = await globalCall("GET", "/v2/orders");
        res.json(response);
    } catch (err: any) {
        res.status(500).json({
            error: err.response?.data || err.message
        });
    }
});

router.get("/orders/history", async (_req, res) => {
    try {
        const response = await globalCall("GET", "/v2/orders/history");
        res.json(response);
    } catch (err: any) {
        res.status(500).json({
            error: err.response?.data || err.message
        });
    }
});

router.get("/fills", async (req, res) => {
    try {
        const { after, limit } = req.query;

        const path = "/v2/fills";
        const qsParts: string[] = [];
        if (after) qsParts.push(`after=${encodeURIComponent(after as string)}`);
        if (limit) qsParts.push(`limit=${encodeURIComponent(limit as string)}`);
        const fullPath = qsParts.length ? `${path}?${qsParts.join("&")}` : path;

        const data = await globalCall("GET", fullPath);
        res.json(data); // no .data here
    } catch (err: any) {
        res.status(500).json({ error: err.response?.data || err.message });
    }
});

async function fetchAllGlobalFills(limit = 100) {
    let after: string | null = null;
    const allFills: any[] = [];

    while (true) {
        const path =
            after == null
                ? `/v2/fills?limit=${limit}`
                : `/v2/fills?limit=${limit}&after=${encodeURIComponent(after)}`;

        console.log(`Fetching fills from: ${path}`);

        try {
            const resp = await globalCall("GET", path);
            console.log("Response received:", JSON.stringify(resp).substring(0, 200));

            // Check if response has expected structure
            if (!resp || typeof resp !== 'object') {
                throw new Error(`Invalid response type: ${typeof resp}`);
            }

            const { result, meta } = resp;

            if (!result) {
                console.error("No result in response:", resp);
                throw new Error(`No result field in response. Response keys: ${Object.keys(resp).join(', ')}`);
            }

            if (!Array.isArray(result)) {
                throw new Error(`Result is not an array: ${typeof result}`);
            }

            allFills.push(...result);
            console.log(`Fetched ${result.length} fills, total: ${allFills.length}`);

            if (!meta?.after) break;
            after = meta.after;
        } catch (error: any) {
            console.error(`Error fetching fills from ${path}:`, error.message);
            console.error("Error details:", error.response?.data || error);
            throw error;
        }
    }

    return allFills;
}

router.get("/fills/all", async (_req, res) => {
    try {
        console.log("Starting fetchAllGlobalFills...");
        const fills = await fetchAllGlobalFills(100);
        console.log(`Successfully fetched ${fills.length} total fills`);
        res.json({ success: true, result: fills });
    } catch (err: any) {
        console.error("fills/all error:", err.message);
        console.error("Full error:", err.response?.data || err);
        res.status(500).json({
            error: err.response?.data || err.message,
            details: err.message
        });
    }
});

router.get("/positions/margined", async (_req, res) => {
    try {
        const response = await globalCall("GET", "/v2/positions/margined");
        res.json(response);
    } catch (err: any) {
        res.status(500).json({ error: err.response?.data || err.message });
    }
});

router.get("/balances", async (_req, res) => {
    try {
        const response = await globalCall("GET", "/v2/wallet/balances");
        res.json(response);
    } catch (err: any) {
        res.status(500).json({ error: err.response?.data || err.message });
    }
});

router.get("/transactions", async (_req, res) => {
    try {
        const response = await globalCall("GET", "/v2/wallet/transactions");
        res.json(response);
    } catch (err: any) {
        res.status(500).json({ error: err.response?.data || err.message });
    }
});


export default router;
