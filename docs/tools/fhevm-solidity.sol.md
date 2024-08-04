---
sidebar_position: 3
---

# fhevm Solidity Library

`fhevm` is the solidity library which enables developers to store encrypted states and further perform operations on those encrypted states via the function avalaible in the library.


for more information on fhevm solidity library visit [here](https://docs.zama.ai/fhevm/v/0.4-2)

### Installation


Install with yarn

```bash
yarn install fhevm
```

Install with npm

```bash
npm install fhevm
```

Install with pnpm
```bash
pnpm install fhevm
```


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
| **Random unsigned int**   | `TFHE.randEuint32()`   |

### ACL specific methods

ACL specific methods maintains allowance i.e. whether a particular user should be allowed to compute on a ciphertex or not.

| **Name**                  | **Function Name**     | **Remarks** |  **Usage**     |
|---------------------------|-----------------------|-----------------------|  -----------------------|  
| **Allow**                   | `TFHE.allow`            |        Allows a particular address to use a ciphertext | `TFHE.allow(TFHE.euint32(1), userAddress)`     |
| **AllowTransient**                   | `TFHE.allowTransient`            |   Allows a particular address to use a ciphertext for the scope of a transaction         | `TFHE.allowTransient(TFHE.euint32(1), userAddress)`  |
| **isAllowed**                   | `TFHE.isAllowed`            |  Checks does an address has allowance to a ciphertext or not |  `TFHE.isAllowed(TFHE.euint32(1), userAddress)`   |
| **isSenderAllowed**                   | `TFHE.isSenderAllowed`     |   Checks is the caller has an allowance to use a ciphertext        | `TFHE.isSenderAllowed(TFHE.euint32(1), userAddress)` | 


