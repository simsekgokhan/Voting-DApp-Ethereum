module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      host: "192.168.1.253", // Connect to geth on the specified
      port: 7545,
      from: "0x3b458d467156710a57bf535b7b3209ceb3afda7b",
      network_id: 4,
      gas: 4996317 // Gas limit used for deploys
    }
  }
}
