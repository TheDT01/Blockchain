const sha256 = require("crypto-js/sha256");

class Block {
    constructor(timestamp, data, previoushash = "") {
        this.timestamp = timestamp;
        this.data = data;
        this.previoushash = previoushash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }


    mineBlock(difficulty) {
        while (
            this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")
        ) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Minig Done " + this.hash);
    }

    calculateHash() {
        return sha256(this.timestamp + JSON.stringify(this.data) + this.previoushash).toString();
        // toString() is added to convert the hash object to a string
    }
}




class Blockchain {
    constructor() {
        this.chain = [this.generateGenesisBlock()];
        this.difficulty = 2;
    }

    generateGenesisBlock() {
        return new Block("2024-04-26", "Genesis", "0000")

    }
    getLatestBlock () {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previoushash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isBlockchainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

        if (currentBlock.previoushash !== currentBlock.calculateHash()) {
            return false;
        }
    }
    return true;
    }
}



const dtcoin = new Blockchain();
const block1 = new Block("2024-04-26", { amount: 5 });
dtcoin.addBlock(block1);
const block2 = new Block("2024-04-22", { amount: 10 });
dtcoin.addBlock(block2);

console.log(dtcoin);
