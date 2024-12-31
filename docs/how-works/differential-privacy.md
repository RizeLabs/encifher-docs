---
sidebar_position: 2
---

# Architecture for Differential Privacy in Existing Applications
[This is the same text as our ETH Research Post](https://ethresear.ch/t/bringing-privacy-to-evm-applications-using-confidential-computing-via-co-processors/21217)

## Differential Privacy

Differential privacy is a mathematical framework used to quantify and ensure the privacy of individuals within a dataset.

The core idea of differential privacy is to ensure that it is difficult to determine whether any specific individual’s data is included in a dataset, even when analyzing the output of an algorithm applied to that dataset. A randomized algorithm is said to satisfy (ϵ,δ) - differential privacy if the inclusion or exclusion of an individual’s data changes the probability of any specific output only slightly.

In the context of differential privacy, ϵ controls the privacy loss, quantifying the maximum difference in output probabilities for neighboring datasets (datasets differing by only one individual). δ represents the probability of a small relaxation in the privacy guarantee, allowing for a slight chance of greater privacy compromise. This framework ensures that the algorithm’s output remains nearly indistinguishable for neighboring datasets, thereby limiting the information leakage about any single data point.

Differential privacy has become a widely adopted standard for privacy-preserving data analysis, offering robust privacy guarantees while enabling valuable statistical insights.


## Encrypted ERC20 Tokens
Encrypted ERC20 standard for privatizing user token balances. Any token balance intended for homomorphic computation on-chain would need to be wrapped within this encrypted ERC20 standard. This approach can serve as a foundation for building various privacy-focused solutions, such as private payments, private auctions, dark pools, and more.

This standard implements necessary interfaces which is used to implement necessary compliance checks, which include selective disclosure of specific ciphertext requested and a few other checks.

To learn more about Encrypted ERC20 you can read this article by Circle [3] 11

## Differential Privacy with Order Aggregation and Batch Settlements
We propose a solution leveraging differential privacy to enable order-solving for encrypted orders. This allows users to place encrypted orders (orders with encrypted tokens) and have them processed on-chain without revealing their details. External parties cannot determine the exact order details associated with a specific user.

Batching is a core component of this solution. The challenge with processing a single encrypted order directly through the protocol is that once decrypted, the amount the user intended to hide becomes visible. To mitigate this, we aggregate multiple orders using the additive homomorphic properties of certain privacy-enhancing technologies (PETs), such as Fully Homomorphic Encryption (FHE). The encrypted amounts are summed and deposited as an aggregated value with a designated manager. The manager’s role is to decrypt this aggregated value via a secure wrapper (obtaining the decrypted tokens amountIn values) so that the resulting assets can interact with the appropriate solver protocol.

By batching encrypted orders, we introduce a level of noise into each order, effectively preserving the privacy of individual users’ order details.

![alt text](image-3.png)
The design is inspired by Zswap DEX of Penumbra [5] 4, which uses sealed-bid batch swaps. The price at which these orders are settled is identical, as there is only one transaction per epoch.

Once the order is solved, the return token amount belonging to the user is calculated homomorphically using the ratio of the input amount to the output amount (the amount received upon solving the order). This calculation is performed homomorphically in the encrypted space, ensuring that no one can fully determine how many tokens a particular user will receive, thereby preserving privacy.

![alt text](image-4.png)
End to End flow Order placing → Order Aggregation → Order Solving → Distribution

![alt text](image-5.png)