---
sidebar_position: 1
---

# Architecture

A key component of this system is the **off-chain co-processor**, which performs encrypted computations on private (encrypted) values and syncs seamlessly with the on-chain state.

---

## PET Co-Processor

The **Privacy-Enhancing Technology (PET) Co-Processor** is the backbone of Encifher’s architecture. It uses advanced cryptographic techniques to enable secure, private, and efficient computations off-chain while maintaining synchronization with the blockchain.

---

### **What is Symbolic Execution?**

WIP  
*(Symbolic execution will be elaborated upon in future updates.)*

---

### **How the TEE Co-Processor Functions**

The **Trusted Execution Environment (TEE)** co-processor is designed to handle encrypted computations efficiently. Here’s how it works:

1. **Real-Time Sync with Full Node**:
   - The TEE co-processor operates alongside a **full blockchain node**, which continuously syncs with the latest blocks on-chain.

2. **Encrypted Requests**:
   - The full node sends encrypted computation requests to the co-processor, ensuring sensitive data remains protected throughout the process.

3. **Symbolic Execution**:
   - The co-processor leverages **symbolic execution** to handle complex calculations on ciphertexts without exposing plaintext values.

4. **Output Generation**:
   - Once computations are completed, the co-processor produces cryptographic proofs and updates the necessary encrypted states, ensuring seamless integration with the blockchain.

WIP  
*(More details will be added to illustrate the workflow.)*

---

### **Future Work**
This section will be expanded to include detailed diagrams, additional explanations of symbolic execution, and performance benchmarks as the architecture evolves.


