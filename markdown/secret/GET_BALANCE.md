Now that you have created an account on the **Secret** `pulsar-2` network, and funded it using the faucet - We're going to check the balance of our account to make sure everything went alright.

{% hint style="info" %}
The native token on the **Secret Network** is **SCRT**
{% endhint %}

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/secret/balance.ts`, implement the default function. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
  try {
    const url = getNodeUrl();
    const { address }= req.body
    const client = new SecretNetworkClient({url, chainId: 'pulsar-2'});

    // Return the balance
    const balance = undefined;

    res.status(200).json(balance?.amount || '0')
  }
```

**Need some help?** Check out this link 👇

- [**Query example**](https://github.com/scrtlabs/secret.js#secretjsquerybankbalance)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

{% hint style="danger" %}
You could experience some issues with the availability of the network. [**Click here to check the current status of `pulsar-2`**](https://secretnodes.com/pulsar)
{% endhint %}

---

# 😅 Solution

```typescript
// solution
  try {
    const url = getNodeUrl();
    const { address }= req.body
    const client = new SecretNetworkClient({url, chainId: 'pulsar-2'});
    const { balance } = await client.query.bank.balance({
      address: address,
      denom: "uscrt",
    });

    res.status(200).json(balance?.amount || '0')
  }
```

**What happened in the code above?**

- We check the balance by querying the bank module and accessing the `amount` property of the `balance` object returned. The `balance` here is an optional <Coin> in the QueryBalanceResponse TypeScript definition.

{% hint style="tip" %}
The amount returned by is denominated in **μSCRT**, so to convert it to **SCRT** you'll need to divide it by 10\*\*6
{% endhint %}

---

# ✅ Make sure it works

Once the code in `pages/api/secret/balance.ts` is complete, Next.js will rebuild the API route. Click on **Check Balance** and you should see the account balance displayed on the page.

---

# 🏁 Conclusion

1000 **SCRT** available, hmmm ... seems it's more than enough to do our first transfer. In the next step, we're going to buy an imaginary pizza which means making a transfer of tokens!
