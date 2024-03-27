const express = require('express');
const app = express();
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const fs = require('fs');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const providerUrl = 'https://eth-sepolia.g.alchemy.com/v2/l8ILSW1lXFh9tfCDc6JksP9xjNsI9Dv3';

const web3 = createAlchemyWeb3(providerUrl);

const bytecode = fs.readFileSync('../bytecode.bin').toString();
const abi = JSON.parse(fs.readFileSync('../Abi.json'));
console.log(abi);

async function requestAccount() {
    // await window.ethereum.request({ method: 'eth_requestAccounts' });
}
app.post('/deploy-contract', async (req, res) => {
    try {
        const { from } = req.body;
        const contract = new web3.eth.Contract(abi);
        const deployTx = contract.deploy({
            data: '0x' + bytecode,
            arguments: [] // Constructor arguments (if any)
        });
        const deployTxReceipt = await deployTx.send({
            from: from, // Metamask ke selected address se transaction bhejo
            gas: web3.utils.toHex(8000000), // Gas limit set karo
            gasPrice: web3.utils.toHex(20000000000) // Gas price set karo
        });
        const contractAddress = deployTxReceipt.options.address;
        console.log('Contract deployed at address:', contractAddress);

        await contract.methods.paymentMethod().send({
            from: from,
            gas: web3.utils.toHex(8000000),
            gasPrice: web3.utils.toHex(20000000000),
            value: web3.utils.toWei('0.1', 'ether') // Adjust the value as needed
        });
        res.status(200).json({ contractAddress });

    } catch (err) {
        console.error('Error deploying contract:', err);
        res.status(500).json({ error: 'Contract deployment failed' });
    }
});

const PORT = process.env.PORT || 5173; // Set the port for the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
