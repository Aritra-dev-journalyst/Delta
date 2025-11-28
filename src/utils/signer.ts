import crypto from "crypto";

export function signRequest(
  method: string,
  path: string,
  apiSecret: string,
  body?: unknown
) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const payload = body ? JSON.stringify(body) : "";
  const message = method + timestamp + path + payload;

  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(message)
    .digest("hex");

  return { timestamp, signature };
}
