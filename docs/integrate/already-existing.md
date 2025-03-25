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

```javascript
import { BalanceParams, TEEClient } from 'petcrypt-js-lite';
import { ClientConfig, PlaintextType } from 'petcrypt-js-lite';
import { EncryptedToken } from 'petcrypt-js-lite/tokens';
import { SUPPORTED_TOKENS, SUPPORTED_CHAINS } from 'petcrypt-js-lite/constants';
import dotenv from 'dotenv';
import { ethers } from 'ethers';
import { TokenConfig } from 'petcrypt-js-lite/types';
```

- Initializing the TEE Client

```javascript
const config: ClientConfig = {
    teeGatewayUrl: process.env.TEE_ENCRYPT_URL || ''
};
const client = new TEEClient(config);
await client.init();
```

- Encrypting Values

```javascript
const amount = ethers.parseUnits('10', 6);
const handle = await client.encrypt(amount, PlaintextType.uint32);
```

- Creating a Wallet Instance

```javascript
const userWallet = new ethers.Wallet(userPvtKey, provider);
```

- Wrapping and Transferring Encrypted ERC20 Tokens

```javascript
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

```javascript
const transferTokenTxn = await eTokenClient.getTransferTxn(userAddress2, transferAmount, PlaintextType.uint32);
const transferTokenRes = await userWallet1.sendTransaction(transferTokenTxn);
await transferTokenRes.wait();
```

- Encrypted Token Approvals and `transferFrom`

```javascript
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

### Help
For more detailed example please dm: [https://t.me/creator5923](https://t.me/creator5923)