import axios from "axios";
import { GLOBAL_CONFIG } from "../config/global.config";
import { signRequest } from "../utils/signer";

export async function globalCall(
    method: "GET" | "POST",
    path: string,
    body?: unknown
) {
    const { timestamp, signature } = signRequest(
        method,
        path,
        GLOBAL_CONFIG.API_SECRET,
        body
    );

    const headers: any = {
        "api-key": GLOBAL_CONFIG.API_KEY,
        timestamp,
        signature,
        "Content-Type": "application/json"
    };

    if (GLOBAL_CONFIG.PASSPHRASE) {
        headers.passphrase = GLOBAL_CONFIG.PASSPHRASE;
    }

    return axios({
        method,
        url: GLOBAL_CONFIG.BASE_URL + path,
        headers,
        data: body
    });
}
