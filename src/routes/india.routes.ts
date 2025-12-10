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

router.get("/fills", async (req, res) => {
  try {
    const { after, limit } = req.query;

    const path = "/v2/fills";
    const qsParts: string[] = [];
    if (after) qsParts.push(`after=${encodeURIComponent(after as string)}`);
    if (limit) qsParts.push(`limit=${encodeURIComponent(limit as string)}`);
    const fullPath = qsParts.length ? `${path}?${qsParts.join("&")}` : path;

    const data = await indiaCall("GET", fullPath);
    res.json(data); // no .data here
  } catch (err: any) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

async function fetchAllIndiaFills(limit = 100) {
  let after: string | null = null;
  const allFills: any[] = [];

  while (true) {
    const path =
      after == null
        ? `/v2/fills?limit=${limit}`
        : `/v2/fills?limit=${limit}&after=${encodeURIComponent(after)}`;

    const resp = await indiaCall("GET", path); // resp is already data
    const { result, meta } = resp;

    allFills.push(...result);

    if (!meta?.after) break;
    after = meta.after;
  }

  return allFills;
}

router.get("/fills/all", async (_req, res) => {
  try {
    const fills = await fetchAllIndiaFills(100);
    res.json({ success: true, result: fills });
  } catch (err: any) {
    console.error("fills/all error:", err.response?.data || err.message);
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
