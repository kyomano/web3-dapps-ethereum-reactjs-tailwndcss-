Like with most Web 3 protocols, transactions on Secret happen between **accounts**. To create an account, a client generates a **mnemonic** from which it can (re)-create a **public key** and a public address for use with a **wallet**. We're going to learn how to achieve all of this in the next challenge.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/secret/account.ts`, implement the function to first create a **Wallet**, then produce an **address** and **mnemonic**. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
  try {
    const wallet = undefined;
    const address = undefined;
    const mnemonic = undefined;
    res.status(200).json({mnemonic, address})
  }
//...
```

**Need some help?** Check out these links

- [**Documentation for Secret.JS `Wallet`**](https://github.com/scrtlabs/secret.js#wallet)
- [**Account example**](https://github.com/scrtlabs/SecretJS-Templates/blob/master/2_creating_account/create_account.js)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
  try {
    const wallet = new Wallet();
    const address = wallet.address;
    const mnemonic = wallet.mnemonic
    res.status(200).json({mnemonic, address});
  }
```

**What happened in the code above?**

- First we create a random **mnemonic** using the `Wallet` constructor.
- We can access the mnemonic, address, publicKey, privateKey and more from the Wallet object.
- Finally we send the mnemonic and address back to the client-side as a JSON object.

{% hint style="tip" %}
Do not forget to fund the newly created wallet using the [secret faucet](https://faucet.pulsar.scrttestnet.com) in order to activate it!
{% endhint %}

---

# ✅ Make sure it works

Once the code in `pages/api/secret/account.ts` is complete, Next.js will rebuild the API route. Click on **Generate a Mnemonic** to create a random seed and generate the mnemonic seed phrase.

---

# 🏁 Conclusion

Before we make our first transfer, let's check that the account is actually funded by querying the network for our balance!
