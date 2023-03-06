import type {NextApiRequest, NextApiResponse} from 'next';
import {Wallet} from 'secretjs';

type ResponseT = {
  mnemonic: string;
  address: string;
};
export default async function connect(
  _req: NextApiRequest,
  res: NextApiResponse<ResponseT | string>,
) {
  try {
    const wallet = undefined;
    const address = undefined;
    const mnemonic = undefined;

    res.status(200).json({mnemonic, address});
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
