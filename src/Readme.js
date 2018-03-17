
// Ref:
https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2

//// 1. Setup
mkdir & cd basic-voting-app
npm i ganache-cli web3@0.20.2
    // ganache: in-memory blockchain (blockchain simulator)
    //      ganache-cli creates 10 test accounts to play with automatically. 
    //      These accounts come preloaded with 100 (fake) ethers
    //      Listening on localhost:8545
    // web3 (web3.js): Ethereum JavaScript API

// Start local blockchain
node_modules/.bin/ganache-cli 


//// 2. Compile & Deploy

// Firstly run: $node

// Make sure web3 object is initialized and can communicate with simulated blockchain (ganache)
Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// Compile
code = fs.readFileSync('voting.sol').toString()
solc = require('solc')
compiledCode = solc.compile(code)

// 
abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
VotingContract = web3.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':Voting'].bytecode

// Deploy
deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})

// Show
deployedContract.address    
    // Save the contract address: 0xe5b458728bfd383df98353063379fa1e71855f64
contractInstance = VotingContract.at(deployedContract.address)  
    // show contract details


//// --------- 3. Interact with the contract in the nodejs console

// Vote
contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})

// Get votes
contractInstance.totalVotesFor.call('Rama').toLocaleString()
    // '1'
