---
sidebar_position: 1
---

# PET Co-processor

### Functioning of TEE Co-Processor

The TEE co-processor leverages [symbolic execution](https://docs.encifher.io/docs/how-works/symbolic-exec) to perform ciphertext calculations efficiently. It operates alongside a full node, which continuously syncs in real time with the latest blocks produced on-chain. The full node sends requests to the co-processor to calculate the ciphertexts corresponding to those requests.

WIP 