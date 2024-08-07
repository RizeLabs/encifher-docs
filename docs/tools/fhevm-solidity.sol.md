---
sidebar_position: 3
---

# fhevm Solidity Library

`fhevm` is the solidity library which enables developers to store encrypted states and further perform operations on those encrypted states.


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

| Type      | Supported | Remark | 
|-----------|:---------:|:---------: |
 | **ebool**     | ✔️ Yes     | encrypting bool values |
| **euint4**    | ✔️ Yes     | encrypting uint4 values |
| **euint8**    | ✔️ Yes     | encrypting uint8 values |
| **euint16**   | ✔️ Yes     | encrypting uint16 values |
| **euint32**   | ✔️ Yes     | encrypting uint32 values |
| **euint64**   | ✔️ Yes     |encrypting uint64 values |
| **eaddress**  | ✔️ Yes     |encrypting an evm address |
| **ebytes256** | ✔️ Yes     | |
|  **einput** | ✔️ Yes    |  stores handles of ciphertext  |

### Casting / Usage

#### Storing ciphertext onchain

Let's consider a scenario where you want to store a ciphertext onchain.

1. First you'll encrypt an input using the fhevmjs instance

```js
const input = instance.createEncryptedInput(contractAddress, userAddress);

// encrypting an input let's say 2000
input.add64(2000);
const { handles, inputProof } = input.encrypt();
```
2. So once you encrypt your plaintext you'll get two things `handles` and `inputProof`. Where `handles` is the handle for your ciphertext which will work as a pointer for contracts to get the ciphertext data. And `inputProof` is the zkPoK which is nothing but proof of correct encryption.

> **Tip:** You can encrypt multiple values at once in that scenario the `input.encrpt()` will returns an array of handle and inputProof. Something like this 
```js
const input = instance.createEncryptedInput(contractAddress, userAddress);

// encrypting an input let's say 2000
input.add64(2000).add32(100);
const { handles, inputProof } = input.encrypt();
// handles[0] -> handle for ciphertext of 2000
// handles[1] -> handle for ciphertext of 100
// inputProof -> proof of correct encryption of both ciphertext
```

3. Now, Since you understood handles and inputProof. Now to store your ciphertext offchain you can do something like this 

```js
function saveCipherText(einput encrypteValueHandle, bytes calldata inputProof) public virtual {
    euint64 secretValueEuint64 = TFHE.asEuint64(encrypteValueHandle, inputProof)
}
```

You can also cast one datatype into another (Implicit Casting). For example: 

For casting euint16 ciphertext into euint32 ciphertext

```js
function castCiphertextEuint16ToEuint32() public virtual {
    euint32 secretValue = TFHE.asEuint32(secretValueEuint16)
}
```

For casting normal uint16 to euint16 ciphertext

```js
function castUint16ToEuint15() public virtual {
    uint16 value = 100;
    euint32 secretValue = TFHE.asEuint16(value)
}
```


### Available Operations (Operations you can perform on Ciphertext)

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

### ACL (Access Control List) specific methods

ACL specific methods maintains allowance i.e. whether a particular user should be allowed to compute on a ciphertext or not.

| **Name**                  | **Function Name**     | **Remarks** |  **Usage**     |
|---------------------------|-----------------------|-----------------------|  -----------------------|  
| **Allow**                   | `TFHE.allow`            |        Allows a particular address to use a ciphertext | `TFHE.allow(TFHE.euint32(1), userAddress)`     |
| **AllowTransient**                   | `TFHE.allowTransient`            |   Allows a particular address to use a ciphertext for the scope of a transaction         | `TFHE.allowTransient(TFHE.euint32(1), userAddress)`  |
| **isAllowed**                   | `TFHE.isAllowed`            |  Checks does an address has allowance to a ciphertext or not |  `TFHE.isAllowed(TFHE.euint32(1), userAddress)`   |
| **isSenderAllowed**                   | `TFHE.isSenderAllowed`     |   Checks is the caller has an allowance to use a ciphertext        | `TFHE.isSenderAllowed(TFHE.euint32(1), userAddress)` | 


