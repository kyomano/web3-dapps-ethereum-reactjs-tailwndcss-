import type {NextApiRequest, NextApiResponse} from 'next';
import {configFromNetwork} from '@figment-near/lib';
import {connect, KeyPair} from 'near-api-js';
import {parseNearAmount} from 'near-api-js/lib/utils/format';
import BN from 'bn.js';
import { Keypair } from '@figment-near/components';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  const {txSender, txAmount, txReceiver, network, secret} = req.body;

  try {
    const config = configFromNetwork(network);

    // recreate the keypair from secret
    const keypair = KeyPair.fromString(secret);

    // Set the keystore with the expected method and args
    config.keyStore?.setKey("testnet",txSender, keypair);

    // Here we convert the NEAR into yoctoNEAR using   utilities from NEAR lib
    const yoctoAmount = parseNearAmount(txAmount) as string;
    const amount = new BN(yoctoAmount);
    
    // Fill the Gap: connect, create an Account Object and send some money
    const near = await connect(config);
    const account = await near.account(txSender);
    console.log("account");
    const transaction = await account.sendMoney(txReceiver, amount);
    console.log("hash");
    console.log(transaction.transaction.hash);

    return res.status(200).json(transaction.transaction.hash);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    return res.status(500).json(errorMessage);
  }
}
