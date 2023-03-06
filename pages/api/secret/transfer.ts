import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeUrl} from '@figment-secret/lib';
const {SecretNetworkClient, Wallet} = require('secretjs');

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const url = getNodeUrl();
    const {mnemonic, txAmount, recipient} = req.body;

    // 1. Initialize the wallet with the given mnemonic
    const wallet = undefined;

    // 2. Initialize a secure Secret Network client
    // Pass in a wallet that can sign transactions
    // Docs: https://github.com/scrtlabs/secret.js#secretnetworkclient

    // const client = new SecretNetworkClient(undefined);

    // 3. Send tokens
    const memo = 'sendTokens example'; // Optional memo to identify the transaction

    const sent = await client.undefined;

    res.status(200).json(sent.transactionHash);
  } catch (error) {
    console.error(error);
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
