---
sidebar_position: 2
---

# fhevmjs

### Installation

```bash
## install with yarn
yarn install fhevmjs

### install with npm
npm install fhevmjs

### install with pnpm
npm install fhevmjs


```

### Using fhevmjs

### Creating Instance 

```js
const { createInstance, getPublicKeyCallParams } = require("fhevmjs");
const { ethers, JsonRpcProvider } = require("ethers");

const provider = new JsonRpcProvider(`<devnet-url>`);

const createFhevmInstance = async () => {
  const network = await provider.getNetwork();
  const chainId = +network.chainId.toString();
  const ret = await provider.call(getPublicKeyCallParams());
  const decoded = ethers.AbiCoder.defaultAbiCoder().decode(["bytes"], ret);
  const publicKey = decoded[0];

  return createInstance({ chainId, publicKey });
};

```

### Using Instance

Encrypting inputs using instance created above

```js
const instance = await createFhevmInstance();

const encryptedParamBool = instance.encryptBool(true);
const encryptedParam4 = instance.encrypt4(3);
const encryptedParam8 = instance.encrypt8(14);
const encryptedParam16 = instance.encrypt16(650);
const encryptedParam32 = instance.encrypt32(71721057);
const encryptedParam64 = instance.encrypt64(71721075);

```



