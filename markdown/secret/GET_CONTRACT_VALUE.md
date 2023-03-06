Our contract is on-chain, and we're going to learn how to fetch the count stored on the contract.

{% hint style="working" %}
If you want to learn more about Secret smart contracts, follow the [**Developing your first secret contract**](https://learn.figment.io/tutorials/creating-a-secret-contract-from-scratch) tutorial.
{% endhint %}

{% hint style="danger" %}
You could experience some issues with the availability of the network [**Click here to check the current status**](https://secretnodes.com/pulsar)
{% endhint %}

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/secret/getter.ts`, complete the code of the default function. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out.**

```tsx
//...
// Get the stored value
console.log('Querying contract for current count');
const count = undefined;
//...
```

**Need some help?** Check out these links 👇

- [**Contract example**](https://github.com/scrtlabs/SecretJS-Templates/blob/master/5_contracts)
- [**`queryContract()`**](https://github.com/scrtlabs/secret.js#secretjsquerycomputequerycontract)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```tsx
// solution
//...
// Get the stored value
console.log('Querying contract for current count');

const {count} = await client.query.compute.queryContract({
  contract_address: contractId,
  query: {get_count: {}},
});
//...
```

**What happened in the code above?**

- We're calling the `queryContract` method of the client, passing to it:
  - The `contractId`, which is the contract address.
  - The `{ get_count: {} }` object which represents the name of the method we are calling and the parameters we're passing to it. In this case, there are no arguments passed to `get_count`, but we must still pass an empty object: `{}`.

---

# ✅ Make sure it works

Once the code in `pages/api/secret/getter.ts` is complete, click **Get the stored value** to query the smart contract and display the value.

---

# 🏁 Conclusion

Now, time for the last challenge! Time to modify the state of the contract and thus the state of the blockchain. Let's go!
