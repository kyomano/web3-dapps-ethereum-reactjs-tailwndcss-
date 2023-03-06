import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeUrl} from '@figment-secret/lib';
import {SecretNetworkClient} from 'secretjs';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string | string>,
) {
  try {
    const url = getNodeUrl();
    const {address} = req.body;
    const client = new SecretNetworkClient({url, chainId: 'pulsar-2'});

    // Return the balance
    const {balance} = undefined;
    res.status(200).json(balance?.amount || '0');
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
