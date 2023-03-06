import {getNodeUrl} from 'components/protocols/secret/lib';
const {SecretNetworkClient, Wallet} = require('secretjs');
import {Bip39, Random} from '@iov/crypto';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.resolve('.env.local')});

// Avoid jest open handle error
afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 10000));
});

const client = new SecretNetworkClient({url: getNodeUrl()});

function getSecretExplorerURL(txHash: string) {
  return `https://secretnodes.com/pulsar/transactions/${txHash}`;
}

function getAddressFromMnemonic(mnemonic: string) {
  const wallet = new Wallet(mnemonic);
  return wallet.address;
}

async function getBalanceFromMnemonic(mnemonic: string) {
  const {balance} = await client.query.bank.balance({
    address: getAddressFromMnemonic(mnemonic),
    denom: 'uscrt',
  });
  return balance as string;
}

async function connection() {
  return await client.restClient.nodeInfo();
}

async function keypair(mnemonic: string) {
  if (!mnemonic) {
    const randomMnemonic = Bip39.encode(Random.getBytes(16)).toString();
    console.log('Generated mnemonic:', randomMnemonic);
    const wallet = new Wallet(randomMnemonic);
    console.log('Address of generated mnemonic:', wallet.address);
    return wallet.address as string;
  } else {
    const wallet = new Wallet();
    return wallet.address as string;
  }
}

async function balance(mnemonic: string) {
  try {
    return getBalanceFromMnemonic(mnemonic);
  } catch (error) {
    console.log(
      `Get balance for ${getAddressFromMnemonic(mnemonic)} error:`,
      error,
    );
  }
}

async function transfer(recipient: string, sender: string) {
  const TX_AMOUNT = '100000';

  const recipientWallet = new Wallet(recipient);
  const senderWallet = new Wallet(sender);

  const receiverAddress = recipientWallet.address;
  const senderAddress = senderWallet.address;

  const client = new SecretNetworkClient({
    url: getNodeUrl(),
    wallet: senderWallet,
    walletAddress: senderAddress,
    chainId: 'pulsar-2',
  });

  const sent = await client.sendTokens(
    receiverAddress as string,
    [
      {
        amount: TX_AMOUNT as string,
        denom: 'uscrt' as string,
      },
    ],
    'Testing sendTokens()',
  );

  console.log(
    `${senderAddress} to ${receiverAddress} : \n${getSecretExplorerURL(
      sent.transactionHash,
    )}`,
  );

  return sent;
}

/**
 * Test cases
 *
 * FUNDED     - spot history divert episode dove van unable hire bargain legal improve hurdle       // secret1v4n4du5w02degaalj682p03pjkthf4cund49hc
 * NOT FUNDED - expose ring elevator critic panther injury trigger person butter rescue local where // secret1xy0h5qpfssl20vfcx8a2cham6cmrr8mnl9ln4g
 * NOT FUNDED - multiply horror waste this enemy glue act dream camp reopen trophy brick            // secret1xangfqmzvdlf2z44mrv30nar6mv43ma7pc7k2j
 */

describe('Secret backend tests', () => {
  // Avoid jest open handle error
  jest.setTimeout(30000);

  test('Connection', async () => {
    await expect(connection()).resolves.toHaveProperty(
      'application_version.version',
    );
  });

  test('Generate keypair', async () => {
    await expect(keypair('')).resolves.toHaveLength(45);
  });

  test('Keypair from mnemonic', async () => {
    await expect(
      keypair(
        'multiply horror waste this enemy glue act dream camp reopen trophy brick',
      ),
    ).resolves.toHaveLength(45);
  });

  test('Funded balance', async () => {
    await expect(
      balance(
        'spot history divert episode dove van unable hire bargain legal improve hurdle',
      ), // secret1v4n4du5w02degaalj682p03pjkthf4cund49hc
    ).resolves.toBeDefined();
  });

  test('Not funded balance', async () => {
    await expect(
      balance(
        'multiply horror waste this enemy glue act dream camp reopen trophy brick',
      ), // secret1xangfqmzvdlf2z44mrv30nar6mv43ma7pc7k2j
    ).resolves.toBeUndefined();
  });

  test('Transfer', async () => {
    await expect(
      transfer(
        'expose ring elevator critic panther injury trigger person butter rescue local where',
        'spot history divert episode dove van unable hire bargain legal improve hurdle',
      ),
    ).resolves.toBeDefined();
  });
});
