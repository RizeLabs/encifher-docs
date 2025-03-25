---
sidebar_position: 3
---

# Integrating Encrypted Token Transfers into Existing Protocols

## Overview
Encifher provides SDKs and smart contract libraries to facilitate the integration of privacy-preserving DeFi functionalities. Currently, the primary functionalities include token wrapping and encrypted transfers, with future plans to support additional DeFi primitives such as swapping, lending, and staking.

## High-Level Concept
Tokens adhering to the ERC20 standard (e.g., USDC) can be seamlessly wrapped into their encrypted counterparts (e.g., eUSDC). These encrypted tokens retain all ERC20 functionality while enabling privacy-preserving transactions, including private token transfers.

## Wrapping Tokens
Encifher allows users to perform DeFi operations privately by wrapping their tokens into encrypted forms. This process can be abstracted at the dApp level to appear as a "deposit" operation for a seamless user experience. 

### Integration Approaches
Encifher supports two integration methods:
1. **Smart Contract Integration**: Directly interacting with smart contracts for wrapping and transferring encrypted tokens.
2. **SDK Integration**: Using the `petcrypt-js-lite` SDK to handle encryption and transaction broadcasting.

## Smart Contract Integration

### Installation
To integrate the wrapping functionality into smart contracts, install the `encifher-contracts` library:
```sh
pnpm install encifher-contracts

*** Example Smart Contract Implementation ***
```solidity
import "encifher-contracts/contracts/lib/PET.sol";
import "encifher-contracts/contracts/interfaces/IEERC20.sol";
import "encifher-contracts/contracts/interfaces/IEERC20Wrapper.sol";

contract TokenWrapperContract {
    IEERC20Wrapper public eERC20Wrapper;
    IEERC20 public ERC20Token;
    address public eERC20Token;
    address public receiver; // Receiver address

    constructor(address _eERC20Wrapper, address _ERC20Token, address _eERC20Token) {
        eERC20Wrapper = IEERC20Wrapper(_eERC20Wrapper);
        eERC20Token = IEERC20(_eERC20Token);
        ERC20Token = IEERC20(_ERC20Token);
    }

    function wrapTokens(uint256 _tokenAmount) external {
        // Approve the wrapper contract to use the specified amount
        ERC20Token.approve(address(eERC20Wrapper), _tokenAmount);
        
        // Wrap the tokens
        eERC20Wrapper.depositAndWrap(address(this), _tokenAmount);
    }

    function transferTokens(bytes32 _tokenAmountHandle) external {
        // Transfer encrypted tokens
        eERC20Token.transfer(receiver, _tokenAmountHandle);
    }

    function transferFromTokens(bytes32 _tokenAmountHandle) external {
        // Approve transfer of encrypted tokens
        eERC20Token.approval(address(this), _tokenAmountHandle);
        
        // Transfer encrypted tokens
        eERC20Token.transferFrom(address(this), receiver, _tokenAmountHandle);
    }
}
```

## SDK Integration

### Installation

- To integrate the SDK, install petcrypt-js-lite:

```
pnpm install petcrypt-js-lite
```

- Importing Required Modules

```
import { BalanceParams, TEEClient } from 'petcrypt-js-lite';
import { ClientConfig, PlaintextType } from 'petcrypt-js-lite';
import { EncryptedToken } from 'petcrypt-js-lite/tokens';
import { SUPPORTED_TOKENS, SUPPORTED_CHAINS } from 'petcrypt-js-lite/constants';
import dotenv from 'dotenv';
import { ethers } from 'ethers';
import { TokenConfig } from 'petcrypt-js-lite/types';
```

- Initializing the TEE Client

```
const config: ClientConfig = {
    teeGatewayUrl: process.env.TEE_ENCRYPT_URL || ''
};
const client = new TEEClient(config);
await client.init();
```

- Encrypting Values
```
const amount = ethers.parseUnits('10', 6);
const handle = await client.encrypt(amount, PlaintextType.uint32);
```

- Creating a Wallet Instance

```
const userWallet = new ethers.Wallet(userPvtKey, provider);
```

- Wrapping and Transferring Encrypted ERC20 Tokens

```
const tokenConfig: TokenConfig = {
    token: token,
    chains: chain
};
const eTokenClient = new EncryptedToken(tokenConfig);

const txns = eTokenClient.getWrappingTxn(userAddress1, amount);
const approvalTxn = txns[0];
const wrappingTxn = txns[1];

const approvalTxnRes = await userWallet1.sendTransaction(approvalTxn);
await approvalTxnRes.wait();
```

- Performing Encrypted Token Transfers

```
const transferTokenTxn = await eTokenClient.getTransferTxn(userAddress2, transferAmount, PlaintextType.uint32);
const transferTokenRes = await userWallet1.sendTransaction(transferTokenTxn);
await transferTokenRes.wait();
```

- Encrypted Token Approvals and `transferFrom`

```
// Approve encrypted token transfer
const encryptedTokenApprovalTxn = await eTokenClient.getEncryptedTokenApproval(amount, PlaintextType.uint32, userAddress1);
const encryptedTokenApprovalTxnRes = await userWallet2.sendTransaction(encryptedTokenApprovalTxn);
await encryptedTokenApprovalTxnRes.wait();
console.log(`User 2 approved ${Number(approvalAmount) / 10 ** 6} eUSDC to User 1`);

// Perform `transferFrom`
const encryptedTokenTransferFromTxn = await eTokenClient.getTransferFromTxn(userAddress2, userAddress1, approvalAmount, PlaintextType.uint32);
const encryptedTokenTransferFromTxnRes = await userWallet1.sendTransaction(encryptedTokenTransferFromTxn);
await encryptedTokenTransferFromTxnRes.wait();
```

### Conclusion

Encifher enables seamless integration of privacy-preserving token transactions into DeFi protocols through both smart contracts and SDK-based approaches. Future updates will introduce additional DeFi primitives, further expanding the capabilities of encrypted token transfers.





# How can existing protocols integrate us?

We have SDK's available for integrating several functionalities right now it's mostly for wrapping tokens and doing encrypted transfer but moving forward will enable several Defi primitives as well such as swapping, lending, staking etc. 

## Highlevel overview

Tokens following ERC20 standards (e.g., USDC) can be seamlessly wrapped into private versions (e.g. eUSDC) with all ERC20 functionality intact. These private versions enable privacy perserving token related activities such as private token transfers.

## Wrapping Tokens
Encifher enables peforming Defi activities privately using Encrypted Tokens users are just required to wrap their tokens into their Encrypted forms at the Dapp level dapps could portray this process as a deposit process just to create to level of abstraction for user. While wrapping their tokens further wrapping could just be done via SDKs or contract integration.

With SDK developers would just have to get user sign wrapping token calldata + take approval of relevant tokens from the user and broadcast the transaction sdk will help in forming the calldata to sign.

On a contract level developers could just use necessary contract interfaces to wrap tokens these interfaces could be easily integrated into protocol's smart contract 

### Wrapping and Transfer tokens [Smart Contract Integration]

**Integration Example**
- Install `encifher-contracts` library using `pnpm install encifher-contracts`.

```solidity
import "encifher-contracts/contracts/lib/PET.sol";
import "encifher-contracts/contracts/interfaces/IEERC20.sol"
import "encifher-contracts/contracts/interfaces/IEERC20Wrapper.sol"

contract TokenWrapperContract {
  IEERC20Wrapper public eERC20Wrapper;
  IEERC20 public ERC20Token;
  address public eERC20Token;
  address public receiver; // random receiver address

  constructor(address _eERC20Wrapper, address _ERC20Token, address _eERC20Token) {
     eERC20Wrapper = IEERC20Wrapper(_eERC20Wrapper);
     eERC20Token = IEERC20(_eERC20Token);
     ERC20Token = _ERC20Token;
  }

  function wrapTokens(uint256 _tokenAmount) {
      // share the approval of tokens to be wrapped with Wrapper contract
      ERC20Token.approve(address(eERC20Wrapper), _tokenAmount);

      // call depositAndWrap method to wrap _tokenAmount no of tokens
      eERC20Wrapper.depositAndWrap(address(this), _tokenAmount);
  }

  // _tokenAmountHandle is the handle we received after encrypting some value
  function transferTokens(bytes32 _tokenAmountHandle) {
      // call the transfer function along with _tokenAmountHandle
      eERC20Token.transfer(receiver, _tokenAmountHandle);
  }

  function tranferFromTokens(bytes32 _tokenAmountHandle) {
      // call the approval function along with _tokenAmountHandle to share approval of encrypted tokens
      eERC20Token.approval(address(this), _tokenAmountHandle);

      // call the transfer function along with _tokenAmountHandle
      eERC20Token.transferFrom(address(this), receiver, _tokenAmountHandle);
  }
}
```

### Wrapping and Transfer Operation [SDK integration]

- Installing sdk `pnpm install petcrypt-js-lite`
- Import necessary modules

```javascript
 import { BalanceParams, TEEClient } from 'petcrypt-js-lite';
 import { ClientConfig, PlaintextType } from 'petcrypt-js-lite'
 import { EncryptedToken } from 'petcrypt-js-lite/tokens';
 import { SUPPORTED_TOKENS, SUPPORTED_CHAINS, CHAIN_TOKENS } from 'petcrypt-js-lite/constants';
 import { BalanceChecker } from 'petcrypt-js-lite/utils'
 import dotenv from 'dotenv';
 import { ethers } from 'ethers';
 import { TokenConfig } from 'petcrypt-js-lite/types';
 import { ERC20_ABI } from 'petcrypt-js-lite/constants';
```

- Initialize TEE Client object which contains necessary methods to help dev encrypt values.

```javascript
    const config: ClientConfig = {
        teeGatewayUrl: process.env.TEE_ENCRYPT_URL || ''
    }
    const client = new TEEClient(config);
    await client.init();
```

- To encrypt a value you just need to call `encrypt` method on client along with value type. Encryption process is already taken care of internally so you don't have to worry about it.

```javascript
 const amount = ethers.parseUnits('10', 6);
 const handle = await client.encrypt(amount, PlaintextType.uint32);
```

- Create wallet instance to relay transactions

```javascript
    const userWallet = new ethers.Wallet(userPvtKey, provider);
```

- We'll use `EncryptedToken` class which is imported from `petcrypt-js-lite` library to perform wrapping and transfer operations on encrypted values.

```javascript
    // Defining the token which we'll be wrapping and making transfer with
    const tokenConfig: TokenConfig = {
        token: token,
        chains: chain
    }
    const eTokenClient = new EncryptedToken(tokenConfig);
```
- We'll be using `eTokenClient` class to perform various operations on tokens
- Performing wrapping transactions which convert Standard ERC20 token into Encrypted ERC20 tokens (eERC20)

```javascript
    let txns = eTokenClient.getWrappingTxn(userAddress1, amount);
    const approvalTxn = txns[0];
    const wrappingTxn = txns[1];

    // broadcast transaction using wallet
    const approvalTxnRes = await userWallet1.sendTransaction(approvalTxn);
    await approvalTxnRes.wait();
```
- Further we could also do encrypted token transfer using `getTransferTxn` method of `eTokenClient` object.

```javascript
    const transferTokenTxn = await eTokenClient.getTransferTxn(userAddress2, transferAmount, PlaintextType.uint32);
    const transferTokenRes = await userWallet1.sendTransaction(transferTokenTxn);
    await transferTokenRes.wait();
```

- We can also get encrypted token approvals and perform `transferFrom`

```javascript
    // taking approval of encrypted tokens
    const encryptedTokenApprovalTxn = await eTokenClient.getEncryptedTokenApproval(amount, PlaintextType.uint32, userAddress1);
    const encryptedTokenApprovalTxnRes = await userWallet2.sendTransaction(encryptedTokenApprovalTxn);
    await encryptedTokenApprovalTxnRes.wait();
    console.log(`User 2 gave approval of ${Number(approvalAmount) / 10 ** 6} eUSDC token to user 1 ${encryptedTokenApprovalTxnRes.hash}`);

    // user 1 will transfer funds from user 2 wallet to his own wallet 
    const encryptedTokenTransferFromTxn = await eTokenClient.getTransferFromTxn(userAddress2, userAddress1, approvalAmount, PlaintextType.uint32);
    const encryptedTokenTransferFromTxnRes = await userWallet1.sendTransaction(encryptedTokenTransferFromTxn);
    await encryptedTokenTransferFromTxnRes.wait();
```

