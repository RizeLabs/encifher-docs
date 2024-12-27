# What is symbolic Execution

Symbolic execution involves performing execution over symbols rather than actual data. In the context of a coprocessor, this means that in Solidity smart contracts, when programming computations on ciphertext (encrypted state), instead of directly calculating the final ciphertext, we calculate a handle or key indicating where the resulting ciphertext should be stored.

This design allows us to decouple EVM state execution from ciphertext calculation. In the EVM, the state is executed based on the logic programmed in the smart contracts, and the handles are computed. Meanwhile, the coprocessor computes the ciphertexts that need to be stored in those handles in parallel.

The performance of symbolic execution is evaluated primarily when there’s a decryption request for a particular ciphertext. To fulfill the request within the same block or within the next 1–2 blocks, it’s crucial that the intermediary ciphertext calculations are performed with the same throughput as the handle computations during smart contract execution.