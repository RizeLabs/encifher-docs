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
// casting normal uint to euint 
euint64 value64 = TFHE.asEuint64(5923);
// casting euint64 to euint32
euint32 value32 = TFHE.asEuint32(value64);
// casting euint32 to ebool
ebool valueBool = TFHE.asEbool(value32);
```

### Available Operations

| **Name**                  | **Function Name**     |
|---------------------------|-----------------------|
| **Add**                   | `TFHE.add`            |
| **Sub**                   | `TFHE.sub`            |
| **Mul**                   | `TFHE.mul`            |
| **Div (plaintext divisor)** | `TFHE.div`           |
| **Rem (plaintext divisor)** | `TFHE.rem`           |
| **BitAnd**                | `TFHE.and`            |
| **BitOr**                 | `TFHE.or`             |
| **BitXor**                | `TFHE.xor`            |
| **Shift Right**           | `TFHE.shr`            |
| **Shift Left**            | `TFHE.shl`            |
| **Rotate Right**          | `TFHE.rotr`           |
| **Rotate Left**           | `TFHE.rotl`           |
| **Equal**                 | `TFHE.eq`             |
| **Not Equal**             | `TFHE.ne`             |
| **Greater than or equal** | `TFHE.ge`             |
| **Greater than**          | `TFHE.gt`             |
| **Less than or equal**    | `TFHE.le`             |
| **Less than**             | `TFHE.lt`             |
| **Min**                   | `TFHE.min`            |
| **Max**                   | `TFHE.max`            |
| **Neg**                   | `TFHE.neg`            |
| **Not**                   | `TFHE.not`            |
| **Select**                | `TFHE.select`         |
| **Random unsigned int**   | `TFHE.randEuintX()`   |

***Note: Currently we only support version 0.4.0 of fhevm solidity library due to which`TFHE.encrypt` and `TFHE.reencrypt` won't work for now***


