import type {NextApiRequest, NextApiResponse} from 'next';
import {configFromNetwork} from '@figment-near/lib';
import {connect} from 'near-api-js';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  const {network, accountId} = req.body;
  try {
    const config = configFromNetwork(network);
    const client = await connect(config);
    const account = await client.account(accountId);
    const balance = await account.getAccountBalance();
    console.log(balance.available);
    return res.status(200).json(balance.available);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    console.log(errorMessage);
    return res.status(500).json(errorMessage);
  }
}
