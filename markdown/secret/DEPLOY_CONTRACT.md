We won't go through the process of reviewing the smart contract code base, compiling it or testing it. We will focus instead on how one can deploy a smart contract using the `secretjs` library. To do this, we're going to use a pre-compiled smart contract, you can find it under `./contract/secret/contract.wasm`.

Our contract implements a simple counter. The contract is created with a parameter for the initial count and allows subsequent incrementing:

- The `get_count` function returns the value of the counter stored on the contract.
- The `increment` function increases the value of the counter stored on the contract by 1.

{% hint style="working" %}
If you want to learn more about Secret smart contracts, follow the [**Developing your first secret contract**](https://learn.figment.io/tutorials/creating-a-secret-contract-from-scratch) tutorial.
{% endhint %}

{% hint style="danger" %}
You could experience some issues with the availability of the network [**Click here to check the current status**](https://secretnodes.com/pulsar)
{% endhint %}

Before focusing on the deployment instructions, let's take a look at some important global variables:

```typescript
const CONTRACT_PATH = './contracts/secret/contract.wasm';
const STORE_CODE_GAS_LIMIT = 1_000_000;
const INIT_GAS_LIMIT = 100_000;
const EXECUTE_GAS_LIMIT = 100_000;
```

- `CONTRACT_PATH` is pointing to the location of the optimized **WebAssembly** version of the smart contract.
- The remaining constants are gas limits for storing, initializing and executing the contract.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/secret/deploy.ts`, implement the default function. Upload your first smart contract on the **Secret** network. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out.**

```tsx
//...
// Upload the contract wasm
const wasm = fs.readFileSync(CONTRACT_PATH);
const uploadReceipt = await client.tx.compute.undefined;

// Get the code ID from the receipt
const {codeId} = uploadReceipt;

// Create an instance of the Counter contract, providing a starting count
const initMsg = {count: 101};
const receipt = await client.undefined;

const contractAddress = undefined;
//...
```

**Need some help?** Check out these links 👇

- [**Contract example**](https://github.com/scrtlabs/SecretJS-Templates/blob/master/5_contracts)
- [**The `storeCode` function**](https://github.com/scrtlabs/secret.js#secretjstxcomputestorecode)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```tsx
// solution
//...
// Upload the contract wasm
const wasm = fs.readFileSync(CONTRACT_PATH);
const uploadReceipt = await client.tx.compute.storeCode(
  {
    sender: wallet.address,
    wasm_byte_code: wasm,
    source: '',
    builder: '',
  },
  {
    gasLimit: STORE_CODE_GAS_LIMIT,
  },
);
// Get the code ID from the receipt
const codeId = Number(
  uploadReceipt.arrayLog.find(
    (log: {type: string; key: string}) =>
      log.type === 'message' && log.key === 'code_id',
  ).value,
);

// Contract hash, useful for contract composition
const contractCodeHash = (
  await client.query.compute.codeHashByCodeId({code_id: codeId})
).code_hash;
console.log(`Contract hash: ${contractCodeHash}`);

// Create an instance of the Counter contract, providing a starting count
const initMsg = {count: 101};
const receipt = await client.tx.compute.instantiateContract(
  {
    code_id: codeId,
    sender: wallet.address,
    code_hash: contractCodeHash, // this is optional but makes contract executions much faster
    init_msg: initMsg,
    label: 'Simple Counter' + Math.ceil(Math.random() * 100000),
  },
  {
    gasLimit: INIT_GAS_LIMIT,
  },
);

const contractAddress = receipt.arrayLog.find(
  (log: {type: string; key: string}) =>
    log.type === 'message' && log.key === 'contract_address',
).value;

// An alternate way to reach the contract address
// const contractAddress = JSON.parse(receipt?.rawLog)[0].events[0]
// .attributes[3].value;
//...
```

**What happened in the code above?**

- First, we upload the contract using `storeCode` method of the `SecretNetworkClient`.
- Next, we searched the arrayLog in the `uploadReceipt` response object to find the `code_id` of the deployed contract
- Finally, we instantiate the contract using `instantiateContract` method of the `SecretNetworkClient`, passing:
  - The `code_id`.
  - The `init_msg` contract method to instantiate the storage with a value of `101`.
  - A label, which needs to be unique, which is why we use a random number.
  - We set the transaction gas limit to the constant value INIT_GAS_LIMIT.
  - Optionally, we could also include a memo, a transfer amount, fees, and a code hash. For this example, these arguments are unnecessary.
  - To find the deployed address of the contract, we can look in the receipt logs using the find method from JavaScript. As noted in the code comment, you could also parse the JSON response.

---

# ✅ Make sure it works

Once the code in `pages/api/secret/deploy.ts` is complete, click on **Deploy Contract** to send the compiled smart contract to the network.

---

# 🏁 Conclusion

Now that we have deployed a smart contract, let's interact with it! In the following tutorials, we will look at how to use both view and change functions.
