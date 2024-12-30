---
sidebar_position: 3
---


# How to integrate existing protocols?

We will have SDK's available for integrating privcate Defi primitives such as swapping, lending, staking etc to be integerated at the wallet or dapp level. 

1. Standard tokens (e.g., USDC) are seamlessly wrapped into private versions (e.g. eUSDC) with all ERC20 functionality intact.
2. Transaction batching adds noise to mask individual details while ensuring efficiency.
3. Off-chain cryptographic computations preserve blockchain performance.
4. Aggregate private actions (swaps, lending, staking) through a Uniswap-inspired structure.
5. Selective transparency through spending and viewing keys ensures regulatory alignment.

## Wrapping Tokens
Encifher enables peforming Defi activities privately using Encrypted Tokens users are just required to wrap their tokens into their Encrypted forms at the Dapp level dapps could portray this process as a deposit process just to create to level of abstraction for user. While wrapping their tokens further wrapping could just be done via SDKs or contract integration.

With SDK developers would just have to get user sign wrapping token calldata + take approval of relevant tokens from the user and broadcast the transaction sdk will help in forming the calldata to sign.

On a contract level developers could just use necessary contract interfaces to wrap tokens these interfaces could be easily integrated into protocol's smart contract 

### Wrapping tokens [Smart Contract Integration]

```
interface IEERC20Wrapper {
  function depositAndWrap(address _to, uint256 _amount) external;

  function depositToken(
    uint256 _amount,
    einput _encryptedAddress,
    bytes calldata _inputProof
  ) external;

  function claimWrappedToken() external;

  function withdrawToken(
    address _to,
    euint32 _amount,
    bytes4 _selector
  ) external;
}
```

Wrapper contract follows above interface implementation. Developers would have to call `depositAndWrap` function after giving approval of tokens to wrapper to convert normal tokens to Encrypted tokens

**Integration Example**

```
interface IEERC20Wrapper {
    function depositAndWrap(address _to, uint256 _amount) external;
}

contract Sample {
  address public eERC20Wrapper;
  address public ERC20Token;

  constructor(address _eERC20Wrapper, address _ERC20Token) {
     eERC20Wrapper = _eERC20Wrapper;
     ERC20Token = _ERC20Token;
  }

  function convertUserTokens(uint256 _tokenAmount) {
      ERC20Token.approve(address(eERC20Wrapper), _tokenAmount);
      eERC20Wrapper.depositAndWrap(address(this), _tokenAmount);
  }
}
```

### Wrapping tokens [SDK integration]

- Installing sdk `pnpm install @encifher-js/core`
- Integration flow
```
  import { EncifherUtils } from "@encifher-js/core";

  const utils = new EncifherUtils({..configs});
  const wrapperAddress = utils[token].wrapperAddress;
  const approvalCalldata = utils[tokens].getWrapperApprovalCalldata(userAddress, amount);

  // get the approval Calldata signed by the user and broadcast it to wrapperAddress
  // transaction object would look something like this
  let txn = {
     to: token,
     from: userAddress,
     data: approvalCalldata
  }

  // sending txn
  // await wallet.sendTransaction(txn);
```

## Integrating Swaps

Once, tokens have been wrapped further the SDK contains bootstrapped flow for certain Defi actions. Primarily for swap the developer would just have to construct intent through which our sdk api would return relevant calldata to sign and provide approval to certain address for performing action.  

### Swapping tokens [Smart Contract Integration]

For swapping we've developed an order manager contract which is callable by the user to place encrypted orders for swap operation.

Swap Focused interface of OrderManager.

```
interface OrderManager {
   function placeOrder(uint256 deadline, einput _amount, bytes _inputProof);
}
```

Contract integration in custom contracts would look like this

```
contract CustomContract {
   function doSomething() {
     // ... some buisness logic
     token.approve(orderManager, _amount); // _amount here is encrypted
     orderManager.placeOrder(deadline, _amount);
   }
}
```

### Swapping tokens [SDK Integration]

- Installing sdk `pnpm install @encifher-js/defi`
- Integration flow

```
import { Swap } from "@encifher-js/defi";

const swapInstance = new Swap({...configs});
const approvalCalldata = swap[SwapType].getSwapApprovalCallData({...params});
const swapCallData = swap[SwapType].getPlaceOrderCalldata({...params});
const omAddress = swap[SwapType].getSwapAddress();

  let txn1 = {
     to: token,
     from: userAddress,
     data: approvalCalldata
  }

  let txn2 = {
     to: omAddress,
     from: userAddress,
     data: swapCallData
  }

// sign and broadcast txns

```

