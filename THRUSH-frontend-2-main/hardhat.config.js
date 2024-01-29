require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const ACC_PRIVATE_KEY = "0x"+"cb881e259b657ea57d454deab892af3a313567c0dd4e39945038d76baeaf9478"
module.exports = {
    solidity: "0.8.4",
    networks: {
        ropsten: {
          url: 'https://ropsten.infura.io/v3/20262928a70d4f43b1c965dd4611cecd',
          accounts: [ACC_PRIVATE_KEY],
          network_id: 3,
          gas: 5500000, // Gas Limit, How much gas we are willing to spent
          gasPrice: 20000000000, // how much we are willing to spent for unit of gas
          confirmations: 2, // number of blocks to wait between deployment
          timeoutBlocks: 200
        }
    },
    paths: {
        artifacts: "./components/NFTMarketplace/artifacts",
        sources: "./components/NFTMarketplace/contracts",
        cache: "./components/NFTMarketplace/cache",
        tests: "./components/NFTMarketplace/test"
    }

}