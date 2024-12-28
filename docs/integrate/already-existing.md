---
sidebar_position: 3
---


# How to integrate existing protocols?

We will have SDK's available for integrating privcate Defi primitives such as swapping, lending, staking etc to be integerated at the wallet or dapp level. 

## Wrapping Tokens
Encifher enables peforming Defi activities privately using Encrypted Tokens users are just required to wrap their tokens into their Encrypted forms at the Dapp level dapps could portray this process as a deposit process just to create to level of abstraction for user. While wrapping their tokens further wrapping could just be done via SDKs or contract integration.

With SDK developers would just have to get user sign wrapping token calldata + take approval of relevant tokens from the user and broadcast the transaction sdk will help in forming the calldata to sign.

On a contract level developers could just use necessary contract interfaces to wrap tokens these interfaces could be easily integrated into protocol's smart contract 

## Integrating Swaps

Once, tokens have been wrapped further the SDK contains bootstrapped flow for certain Defi actions. Primarily for swap the developer would just have to construct intent through which our sdk api would return relevant calldata to sign and provide approval to certain address for performing action.  