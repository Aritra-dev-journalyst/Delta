import "dotenv/config";
import express from "express";
import globalRoutes from "./routes/global.routes";
import indiaRoutes from "./routes/india.routes";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
    res.send("Delta Backend is running ✅");
});

app.use("/api/global", globalRoutes);
app.use("/api/india", indiaRoutes);

// IMPORTANT: real listening port
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running → http://localhost:${PORT}`);
});
