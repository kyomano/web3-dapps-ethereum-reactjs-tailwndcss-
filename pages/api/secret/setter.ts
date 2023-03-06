import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeUrl} from '@figment-secret/lib';
const {Wallet, SecretNetworkClient} = require('secretjs');

const EXECUTE_GAS_LIMIT = 100_000;

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const url = getNodeUrl();
    const {mnemonic, contractId} = req.body;

    // Initialise client
    const wallet = new Wallet(mnemonic);
    const client = new SecretNetworkClient({
      url: url,
      wallet: wallet,
      walletAddress: wallet.address,
      chainId: 'pulsar-2',
    });

    // Increment the counter
    const handleMsg = {increment: {}};

    const response = undefined;

    res.status(200).json(response.transactionHash);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
