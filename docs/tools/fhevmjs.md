---
sidebar_position: 2
---

# Fhevmjs

### Installation

Install with yarn

```bash
yarn add fhevmjs
```

Install with npm

```bash
npm install fhevmjs
```

Install with pnpm
```bash
pnpm install fhevmjs
```

### Using fhevmjs

### Creating Instance 

```js
import { createInstance } from "fhevmjs";

const instance = await createInstance({
  networkUrl: "<devnet url>"
  gatewayUrl: "<gateway url>", // for performing re-encryption
});
```

**You might be wondering why do we need gateway url ?**

Gateway is an integral component of the kms service we are using, It helps in re-directing decryption and re-encryption related request to KMS blockchain.

### Using Instance created above

#### Encrypting inputs using instance created above

```js
const userAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
// contract address which will work with ciphertext
const contractAddress = "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720";

// creating input object it takes both user address and contract 
// address where the input is going to be used so that 
// ciphertext can't be used in some different context
const input = instance.createEncryptedInput(contractAddress, userAddress);

// encrypting an input let's say 2000
input.add64(2000);
const encryptedAmount = input.encrypt();
// encryptedTransferAmount.handles[0] -> handle corresponding to the ciphertext
// encryptedTransferAmount.inputProof -> zkPok (zero knowledge proof of knowledge) of ciphertext 
```

**Thanks for showing method for encrypting a uint64 what about other datatypes ?**

NW, We got you covered 

- `addBool` - encrypt bool value

- `add4` - encrypt a tiny uint4 value

- `add8` - encrypt a value under uint8
- `add16`- encrypt a value under uint16
- `add32`- encrypt a value under uint32
- `add64`- encrypt a value under uint64
- `addAddress`- encrypt an address

#### Re-encrypting inputs using instance created above

Re-encrypting inputs allows user to encrypt input under their own public key. So that only the user can decrypt the value. Further the re-encryption request is catered through threshold network which encrypts the input under a different user provided public key without decrypting it. (Never underestimate the power of cryptography ✨)

Ahh you don't have to get into theory to use it 😂

For re-encryption user need to sign the public key as the signature allows the ciphertext to be encrypted under the user signed public key.

```js
// Generate the private and public key, used for the reencryption
const { publicKey, privateKey } = instance.generateKeypair();

// Create an EIP712 object for the user to sign.
const eip712 = instance.createEIP712(publicKey, contractAddress);

// for node
const signature = await this.signers.signTypedData(
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



