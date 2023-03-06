const {Wallet, SecretNetworkClient} = require('secretjs');
import {getNodeUrl} from '@figment-secret/lib';
import type {NextApiRequest, NextApiResponse} from 'next';

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

    // Get the stored value
    console.log('Querying contract for current count');

    const count = undefined;

    res.status(200).json(count);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
