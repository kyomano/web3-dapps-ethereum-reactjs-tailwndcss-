import {SECRET_NETWORKS} from 'types';

export const accountExplorer = (network: string) => (address: string) => {
  if (network === SECRET_NETWORKS.TESTNET) {
    return `https://secretnodes.com/pulsar/accounts/${address}`;
  } else {
    return `https://secretnodes.com/secret/accounts/${address}`;
  }
};

export const transactionUrl = (hash: string) =>
  `https://secretnodes.com/pulsar/transactions/${hash}`;

export const contractsUrl = (hash: string) =>
  `https://secretnodes.com/pulsar/contracts/${hash}`;

export const getNodeUrl = () => 'https://api.pulsar.scrttestnet.com';
