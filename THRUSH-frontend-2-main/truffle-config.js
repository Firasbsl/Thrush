require('babel-register');
require('babel-polyfill');

const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  contracts_build_directory: "./public/contracts/",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    ropsten: {
      provider: () =>
          new HDWalletProvider({
            mnemonic: {
              phrase: "rifle dice ranch iron offer vibrant echo cricket blossom foil door kitchen"
            },
            providerOrUrl: `https://ropsten.infura.io/v3/20262928a70d4f43b1c965dd4611cecd`,
            addressIndex: 0,
          }),
      network_id: 3,
      gas: 5500000, // Gas Limit, How much gas we are willing to spent
      gasPrice: 20000000000, // how much we are willing to spent for unit of gas
      confirmations: 2, // number of blocks to wait between deployment
      timeoutBlocks: 200, // number of blocks before deployment times out
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11", // Fetch exact version from solc-bin (default: truffle's version)
      optimizer: {
        enabled: true,
        runs: 200
      }
    },
  },
  solidity: {
    compilers: [
        {
          version: "0.8.11"
        },
     ],
  }
};

// 5500000 * 20000000000 = 110000000000000000 = 0,11 ETH => 334 USD
//truffle console --network ropsten
//