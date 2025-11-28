const axios = require('axios');

async function probe(url) {
    try {
        console.log(`Probing ${url}...`);
        const res = await axios.get(url);
        console.log(`SUCCESS: ${url}`, res.status, res.data);
    } catch (err) {
        console.log(`ERROR: ${url}`);
        if (err.response) {
            console.log('Status:', err.response.status);
            console.log('Data:', JSON.stringify(err.response.data, null, 2));
        } else {
            console.log('Message:', err.message);
        }
    }
}

async function main() {
    await probe('http://localhost:3000/api/global/fills');
    await probe('http://localhost:3000/api/global/orders');
    await probe('http://localhost:3000/api/global/positions');
    await probe('http://localhost:3000/api/global/balances');
    await probe('http://localhost:3000/api/global/pnl');
}

main();
