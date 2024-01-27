const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Web3 = require('web3');
require('dotenv').config();

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Enable parsing JSON request bodies

app.use(express.static(path.join(__dirname, 'frontend')));

app.post('/getTransactionData', async (req, res) => {
  const { transactionHash, network } = req.body;

  const alchemyUrl = `https://${network}.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`;
  const web3 = new Web3(new Web3.providers.HttpProvider(alchemyUrl));

    try {
        const transaction = await web3.eth.getTransaction(transactionHash);
        if (!transaction) {
            return res.status(404).send('Transaction not found');
        }

        const responseData = {
            chainId: +transaction.chainId,
            from: transaction.from.toLowerCase(),
            to: transaction.to.toLowerCase(),
            hash: transaction.hash,
            input: transaction.input,
            value: transaction.value
        };

        res.json(responseData);
    } catch (error) {
        res.status(500).send('Error fetching transaction data');
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
