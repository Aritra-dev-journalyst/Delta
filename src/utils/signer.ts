import crypto from "crypto";

export function signRequest(
  method: string,
  path: string,
  apiSecret: string,
  body?: unknown
) {
  // CRITICAL FIX: Delta Exchange uses SECONDS, not microseconds!
  const timestamp = Math.floor(Date.now() / 1000).toString(); // Seconds

  const payload = body ? JSON.stringify(body) : "";
  const message = method + timestamp + path + payload;

  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(message)
    .digest("hex");

  return { timestamp, signature };
}
