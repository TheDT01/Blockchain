const sha256 = require("crypto-js/sha256");

class Block {
    constructor(timestamp, data, previoushash) {
        this.timestamp = timestamp;
        this.data = data;
        this.previoushash = previoushash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return sha256(this.timestamp + JSON.stringify(this.data) + this.previoushash).toString();
        // toString() is added to convert the hash object to a string
    }
}

class Blockchain {
    constructor() {
        this.chain = [];
    }

    addBlock(newBlock) {
        this.chain.push(newBlock);
    }
}

const dtcoin = new Blockchain();
const block = new Block("2024-04-26", { amount: 5 }, "sds");

dtcoin.addBlock(block);

// To see the hash of the block, you can log it directly
console.log("Block Hash:", block.hash);
