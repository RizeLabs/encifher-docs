---
sidebar_position: 2
---

# Deploy First Confidential Contract

In this tutorial we will deploy a very simple voting contract where user can vote on proposal just by saying true/false. And once the voting ends we will check does the proposal has enough yes (greater than an threshold number). If it has the proposal wins. Here with FHE we are able to enable this voting in a privacy friendly manner where no on knows who votes what !! Isn't that crazy ⚡

During this tutorial we will mostly focusing on how can you use encrypted types onchain, Instead of focusing on the actual logic Since we know you are already smart enough to do that!

**Step 1: Write very simple contract**

```js
pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";

contract SimpleVoting {

    // A very simple struct for maintaining proposal info 
    // not much of an info tbh 😅
    struct Proposal {
        euint16 totalVotes;
        string proposalName;
    }

    // maintaing proposal for each candidate
    mapping(address => Proposal) public Proposals;

    // A very simple function to add a proposal
    function addProposal(string calldata _proposalName) public {
        Proposals[msg.sender] = Proposal(TFHE.asEuint16(0), _proposalName);
        Proposal memory _proposal = Proposals[msg.sender];
        TFHE.allow(_proposal.totalVotes, address(this));
        TFHE.allow(_proposal.totalVotes, msg.sender);
    }

    // A very non-sensical voting function 😅
    function voteProposal(address candidate, einput _vote, bytes calldata _inputProof) public {
        // user vote (true / false) was encrypted
        ebool userVote = TFHE.asEbool(_vote, _inputProof);

        // selecting the proposal to vote for 
        Proposal memory _candidateProposal = Proposals[candidate];

        // allow msg.sender to use this encrypted total votes value
        // rememeber something like ACL (Access Control List) table in docs
        TFHE.allowTransient(_candidateProposal.totalVotes, msg.sender);

        // updating votes
        _candidateProposal.totalVotes = TFHE.select(userVote, TFHE.add(_candidateProposal.totalVotes, 1), TFHE.add(_candidateProposal.totalVotes, 0));
    }
}
```

Let's understand whats exactly happening in the contract, There are total of two main functions:
- `addProposal`: This is simple method to add proposal.
- `voteProposal`: This method enable user to cast their vote (true / false) to a particular proposal.

Let's understand `voteProposal` method since it's looks pretty interesting.

```js
// A very non-sensical voting function 😅
function voteProposal(address candidate, einput _vote, bytes calldata _inputProof) public {
    // user vote (true / false) was encrypted
    ebool userVote = TFHE.asEbool(_vote, _inputProof);

    // selecting the proposal to vote for 
    Proposal memory _candidateProposal = Proposals[candidate];

    // allow msg.sender to use this encrypted total votes value
    // rememeber something like ACL (Access Control List) table in docs
    TFHE.allowTransient(_candidateProposal.totalVotes, msg.sender);

    // updating votes
    _candidateProposal.totalVotes = 
        TFHE.select(userVote, TFHE.add(_candidateProposal.totalVotes, 1), TFHE.add(_candidateProposal.  totalVotes, 0));
}
```

The function accept three parameters 
- `candidate`: Candidate address for whose proposal the user is voting.
- `_vote`: Handle to the user encrypted vote.
- `_inputProof`: Proof of correct encryption of your vote.

And then we finally get the actual encrypted vote onchain via

```js
ebool userVote = TFHE.asEbool(_vote, _inputProof);
```

This line does couple of things
- It verifies that the encrypted vote has correct format or not via `_inputProof`.
- Makes sure the user has encrypted either a boolean value.
- Finally it stores the encrypted value of true / false in `userVote` variable. 

I'll skip the next line since it's straightforward 

Now below we are allowing the `msg.sender` for the scope of his transaction to be able to play with the `_candidateProposal.totalVotes` encrypted value since the user want to increase / decrease total votes for the proposal. We use `allowTransient` since we want to give him permission just for the scope of the transaction.

```js
TFHE.allowTransient(_candidateProposal.totalVotes, msg.sender);
```
Now comes the juicy part!

```js
_candidateProposal.totalVotes = 
    TFHE.select(userVote, TFHE.add(_candidateProposal.totalVotes, 1), TFHE.add(_candidateProposal.totalVotes, 0));
```

Since, you'll must be knowing that `TFHE.add` functions helps in performing addition operation to encrypted value.
Further, `TFHE.select` helps you in selecting a encrypted value based on the encrypted boolean passed `userVote` in this case.

So, if the encrypted value `userVote` plaintext correspond to the plaintext `true` value then we will increment `_candidateProposal.totalVotes` by 1 else we won't. As simple as that! 

**Step 2: Let's go the js / ts part**

```js
const [deployer] = await ethers.getSigners();

// Deploy SimpleVoting contract
const SimpleVotingFactory = await ethers.getContractFactory("SimpleVoting");
let SimpleVoting = await SimpleVotingFactory.connect(deployer).deploy();
console.log("SimpleVoting deployed to:", await SimpleVoting.getAddress());

let SimpleVotingContractAddress = await SimpleVoting.getAddress();
const SimpleVotingContractInstance = await ethers.getContractAt('SimpleVoting', SimpleVotingContractAddress, deployer);

// let's add a proposal first 
let txn = await SimpleVotingContractInstance["addProposal(address,string)"](
    deployer.address,
    "Proposal 1",
);

await txn.wait();

// let's vote for the proposal
// Create fhevmjs instance to encrypt transfer amount
const instance = await createInstance();
const vote = true;
console.log(`Plaintext vote: ${vote}`);
const input = instance.createEncryptedInput(SimpleVotingContractAddress, deployer.address)
input.addBool(vote);
const { handles, inputProof } = input.encrypt();
console.log("Encrypted vote (handle, data):", handles[0], inputProof);

txn = await SimpleVotingContractInstance["voteProposal(address,bytes32,bytes)"](
    deployer.address,
    handles[0],
    inputProof
);

await txn.wait();
console.log("Voted successfully!");
```

The first half of this script is pretty simple since we are just deploying and adding a Sample Proposal. Let's understand the second half of it now.

Firstly we are creating the fhevmjs instance using the `createInstance` method as we learned in the fhevmjs [section](https://docs.encifher.io/docs/tools/fhevmjs#creating-instance)

```js
const instance = await createInstance();
```

Next, We are encrypting the user vote. For encrypting user input. First we create a input object using the `createEncryptedInput` method with relevant context of contract address and user address.

```js
const input = instance.createEncryptedInput(SimpleVotingContractAddress, deployer.address)
```
Now let's prepare the boolean input to be encrypted using the `addBool` method. To encrypt it we use the `input.encrypt` method. Which returns two things `(handle, inputProof)`.

`handles`: Handle to the encrypted value (this would be an array if your are encrypted multiple values at a single time)
`inputProof`: Proof of correct encryption. 

```js
input.addBool(vote);
const { handles, inputProof } = input.encrypt();
```

Finally!! We call the `voteProposal` method with relevant parameters

```js
txn = await SimpleVotingContractInstance["voteProposal(address,bytes32,bytes)"](
    deployer.address,
    handle[0],
    data
);
```

You can find the code related to this tutorial [here](https://github.com/RizeLabs/Sample-Hardhat-Template)