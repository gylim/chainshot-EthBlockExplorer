const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const path = require('path');
const ethers = require('ethers');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

let provider = new ethers.providers.JsonRpcProvider(process.env.MAINNET_ALCHEMY_URL);

app.use(cors());
app.use(express.json());

app.get('/address/:address', async (req, res) => {
    const {address} = req.params;
    const balance = await provider.getBalance(address);
    const type = await provider.getCode(address);
    const txCt = await provider.getTransactionCount(address);
    const ens = await provider.lookupAddress(address);
    res.send({ balance, type, txCt, ens});
});

app.get('/block/:blockNum', async (req, res) => {
    const {blockNum} = req.params;
    const block = await provider.getBlock(blockNum === "latest" ? "latest" : parseInt(blockNum));
    res.send({ block });
});

app.get('/block', async (req, res) => {
    const block = await provider.getBlock('latest');
    res.send({ block });
});

app.get('/tx/:txhash', async (req, res) => {
    const {txhash} = req.params;
    const txn = await provider.getTransaction(txhash);
    res.send({ txn });
});

app.post('/:network', async (req, res) => {
    const {network} = req.params;
    if (network === "rinkeby") {
        provider = new ethers.providers.JsonRpcProvider(process.env.RINKEBY_ALCHEMY_URL);
    } else if (network === "goerli") {
        provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_ALCHEMY_URL);
    } else {
        provider = new ethers.providers.JsonRpcProvider(process.env.MAINNET_ALCHEMY_URL);
    }
    res.send();
})

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});