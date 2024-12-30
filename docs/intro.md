---
sidebar_position: 1
---

# Encifher

## What is Encifher ?

Encifher is a privacy engine for DeFi apps. It's like a plug-and-play modular middleware that empowers DeFi apps with seamless, compliant privacy. 
![Encifher Privacy Layer sits on top of DeFi protocols](image.png)

One way is integrating directly with existing dApps and their liquidity, Encifher ensures users don’t need to change ecosystems, download additional wallets, or compromise on functionality. Another way is new dApps can integrate in their smart contracts with private states.

In the core, Encifher uses these off-chain Privacy Enhancing Technology Co-processors, which allow the state to be represented in the smart contract as encrypted. 


![alt text](image-1.png)

### **How does Encifher works?**

1. Users inputs are encrypted and then sent to co-processor which stores them on-chain.
2. Now if any computation on encrypted values comes then both the operated values are sent to the co-processor for homomorphic operations.
3. The results are stored back on to the smart contracts enabling Private Shared State on public chains.

Your interaction with the chain is not anonymous, so people can see that you interacted with a DeFi protocol, but they cannot see how much you are interacting with. Users’ interactions are publicly visible, but sensitive details like transaction amounts remain private.

Encrypted token balances are cryptographically protected, ensuring no sensitive information is leaked even when balances are zero.

Using Encifher’s privacy stack, a user can interact with the DeFi ecosystem:

- Privacy-enabled swaps in DEXs
- Private Lending in Money Markets
- Private transfers or payments through wallets
- Private payment SAFE modules for enterprises
- DAO Governance

### **Why Encifher?**

- **Effortless Integration:** DApps can integrate Encifher without altering smart contracts—only the interaction layer is updated.
- **Privacy Without Complexity:** Users gain encrypted swaps, lending, and yield strategies without sacrificing compliance or usability.
- **Regulatory Alignment:** Compliance is baked into the middleware, ensuring that neither DApps nor users need to manage it.