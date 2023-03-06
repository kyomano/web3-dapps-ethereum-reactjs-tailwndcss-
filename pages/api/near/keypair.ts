import type {NextApiRequest, NextApiResponse} from 'next';
import {KeyPair} from 'near-api-js';
import { Keypair } from '@figment-near/components';

type ReponseT = {
  address: string;
  secret: string;
};

export default function connection(
  _req: NextApiRequest,
  res: NextApiResponse<ReponseT | string>,
) {
  try {
    const keypair = KeyPair.fromRandom('ed25519');
    const secret = keypair.toString();
    const address = keypair.getPublicKey.toString();
    if (!secret || !address) {
      throw new Error('Please complete the code.');
    }
    return res.status(200).json({address, secret});
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    return res.status(500).json(errorMessage);
  }
}
