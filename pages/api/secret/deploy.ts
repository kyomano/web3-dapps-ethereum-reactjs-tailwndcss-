const {Wallet, SecretNetworkClient} = require('secretjs');
import {getNodeUrl} from '@figment-secret/lib';
import type {NextApiRequest, NextApiResponse} from 'next';
import fs from 'fs';

const CONTRACT_PATH = './contracts/secret/contract.wasm';
const STORE_CODE_GAS_LIMIT = 1_000_000;
const INIT_GAS_LIMIT = 100_000;

type ResponseT = {
  contractAddress: string;
  transactionHash: string;
};
export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<ResponseT | string>,
) {
  try {
    const url = await getNodeUrl();
    const {mnemonic} = req.body;

    // Initialise client
    const wallet = new Wallet(mnemonic);
    const client = new SecretNetworkClient({
      url: url,
      wallet: wallet,
      walletAddress: wallet.address,
      chainId: 'pulsar-2',
    });

    // Upload the contract wasm
    const wasm = fs.readFileSync(CONTRACT_PATH);

    // const uploadReceipt = await client.tx.compute.undefined;
    const uploadReceipt = await client.undefined;

    // Get the code ID from the receipt
    // const {codeId} = uploadReceipt;

    // Create an instance of the Counter contract, providing a starting count
    const initMsg = {count: 101};
    const receipt = await client.undefined;

    // const contractAddress = undefined;

    res.status(200).json({
      contractAddress: contractAddress,
      transactionHash: receipt.transactionHash,
    });
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
