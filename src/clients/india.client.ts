import axios from "axios";
import { INDIA_CONFIG } from "../config/india.config";
import { signRequest } from "../utils/signer";

export async function indiaCall(
    method: "GET" | "POST",
    path: string,
    body?: unknown
) {
    const { timestamp, signature } = signRequest(
        method,
        path,
        INDIA_CONFIG.API_SECRET,
        body
    );

    const headers: any = {
        "api-key": INDIA_CONFIG.API_KEY,
        timestamp,
        signature,
        "Content-Type": "application/json",
    };

    if (INDIA_CONFIG.PASSPHRASE) {
        headers.passphrase = INDIA_CONFIG.PASSPHRASE;
    }

    return axios({
        method,
        url: `${INDIA_CONFIG.BASE_URL}${path}`,
        headers,
        data: body,
    });
}
