---
sidebar_position: 2
---

# fhevmjs

### Installation

Install with yarn

```bash
yarn install fhevmjs
```

Install with npm

```bash
npm install fhevmjs
```

Install with pnpm
```bash
pnpm install fhevmjs
```

***Sorry currently we support v0.4.0 version of fhevmjs, Support for latest version coming soon***

### Using fhevmjs

### Creating Instance 

```js
import { createInstance } from "fhevmjs";

const instance = await createInstance({
  networkUrl: "<devnet url>"
  gatewayUrl: "<gateway url>", // for performing re-encryption
});

```

### Using Instance created above

**Encrypting inputs using instance created above**

```js
const userAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const contractAddress = "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720";

// creating input object it takes both user address and contract address where the input is going to be
// used so that ciphertext can't be used in some different context
const input = instance.createEncryptedInput(contractAddress, userAddress);

// encrypting an input let's say 1337
input.add64(1337);
const encryptedAmount = input.encrypt();
// encryptedTransferAmount.handles[0] -> handle corresponding to the ciphertext
// encryptedTransferAmount.inputProof -> zkPok of ciphertext 
```

**Re-encrypting inputs using instance created above**

Re-encrypting inputs allows user to encrypt input under their own public key. So that only the user can decrypt the value. Further the re-encryption request is catered through threshold network which encrypts the input under a different user provided public key without decrypting it.

For enabling re-encryption user need to sign the public key as the signature allows the ciphertext to be encrypted under the user signed public key.

```js
// Generate the private and public key, used for the reencryption
const { publicKey, privateKey } = instance.generateKeypair();

// Create an EIP712 object for the user to sign.
const eip712 = instance.createEIP712(publicKey, contractAddress);

// params for signing
const params = [USER_ADDRESS, JSON.stringify(eip712)];

// for node
const signature = await this.signers.alice.signTypedData(
  eip712.domain,
  { Reencrypt: eip712.types.Reencrypt },
  eip712.message,
);

// for web browsers
// const signature = await window.ethereum.request({ method: "eth_signTypedData_v4", params });

// getting the handle of the ciphertext
const handle = await erc20.balanceOf(userAddress); 
const balance = await instance.reencrypt(handle, privateKey, publicKey, signature, contractAddress, userAddress);
```



**Methods supported by the input object**

- `addBool`

- `add4`

- `add8`

- `add16`

- `add32`

- `add64`

- `addAddress`