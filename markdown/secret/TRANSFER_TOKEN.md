Of course, everyone likes to eat pizza, but among all available pizzas you prefer the pizza you've made for yourself. So to simplify the transfer process we're going to make a transfer _from_ our own account _to_ our own account again.

To do so, you'll need to make an encrypted transaction - in the **Secret** world everything is done with privacy in mind! Let's take a look at how to do this.

{% hint style="danger" %}
You could experience some issues with the availability of the network [**Click here to check the current status**](https://secretnodes.com/pulsar)
{% endhint %}

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/secret/transfer.ts`, implement the default function.
{% endhint %}

**Take a few minutes to figure this out.**

```tsx
//..
// 1. Initialize the wallet with the given mnemonic
const wallet = undefined;

// 2. Initialize a secure Secret client
const client = new SecretNetworkClient(undefined);

// 3. Send tokens
const memo = 'sendTokens example'; // Optional memo to identify the transaction
const sent = await client.tx.bank.send(undefined);
//..
```

**Need some help?** Check out these links 👇

- [**Transaction example**](https://github.com/scrtlabs/SecretJS-Templates/blob/master/4_transactions/transfer.js)
- [**Documentation of `secret.js`**](https://secretjs.scrt.network/)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```tsx
// solution
//...
// 1. Initialize the wallet with the given mnemonic
const wallet = new Wallet(mnemonic);

// 2. Initialize a secure Secret client
const client = new SecretNetworkClient({
  url: url,
  wallet: wallet,
  walletAddress: wallet.address,
  chainId: 'pulsar-2',
});

// 3. Send tokens
const memo = 'sendTokens example'; // optional memo
const sent = await client.tx.bank.send(
  {
    amount: [{amount: txAmount, denom: 'uscrt'}],
    from_address: wallet.address,
    to_address: wallet.address,
  },
  {
    gasLimit: 20_000,
    gasPriceInFeeDenom: 0.25,
    memo: memo,
  },
);
//..
```

**What happened in the code above?**

- First, we initialize the wallet with the mnemonic.
- Next, we create a secure connection using `SecretNetworkClient`, passing:
  - The `url` of the network.
  - The unlocked `wallet` for the mnemonic.
  - The `walletAddress`, specific account address in the wallet that is permitted to sign transactions & permits.
  - The `chainId`, pulsar-2 is the public test network's chainId.
- Next, we send the specified amount of token using `send`, passing:
  - The amount, and `denom` (denomination) of the token - in this case `uscrt`. Note that the format here is an object inside of an array: `[{}]`. This is because the `fees` amount is using the TypeScript definition for the `Coin` interface, which is a `ReadOnlyArray<Coin>` containing both the `denom` and `amount`.
  - The sender's address, `from_address`.
  - The recipient's address. `to_address`.
  - The `gasLimit`
  - The `gasPriceInFeeDenom`
  - An optional `memo` to identify the transaction.

---

# ✅ Make sure it works

Once the code in `pages/api/secret/transfer.ts` is complete, fill in the amount of **SCRT** you want to send to your favorite pizza maker (and as you realize, it was yourself), then click on **Submit Transfer** to send the transaction.

---

# 🏁 Conclusion

Now that we have funded our account and made a transfer, let's move on to deploying some code (known as a "smart contract") to the **Secret** blockchain! Ready to take the plunge? Let's go!
