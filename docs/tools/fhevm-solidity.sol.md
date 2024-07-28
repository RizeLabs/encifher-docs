---
sidebar_position: 3
---

# fhevm Solidity Library

`fhevm` is the solidity library which enables developers to store encrypted states and further perform operations on those encrypted states via the function avalaible in the library.


for more information on fhevm solidity library visit [here](https://docs.zama.ai/fhevm/v/0.4-2)

### Avalaible Encrypted types

| Type      | Supported |
|-----------|:---------:|
| **ebool**     | ✔️ Yes     |
| **euint4**    | ✔️ Yes     |
| **euint8**    | ✔️ Yes     |
| **euint16**   | ✔️ Yes     |
| **euint32**   | ✔️ Yes     |
| **euint64**   | ✔️ Yes     |
| **eaddress**  | ✔️ Yes     |
| **ebytes256** | ✔️ Yes     |

### Casting / Usage

```js
euint64 value64 = TFHE.asEuint64(5923);
euint32 value32 = TFHE.asEuint32(value64);
ebool valueBool = TFHE.asEbool(value32);
```

***Note: Currently we only support version 0.4.0 of fhevm solidity library due to which`TFHE.encrypt` and `TFHE.reencrypt` won't work for now***


