require("@nomiclabs/hardhat-waffle");
const fs= require("fs") //file service: read from local file system
const privateKey= fs.readFileSync(".secret").toString()//reference to the priv key


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const projectId=""
module.exports = {
  networks:{
    hardhat:{
      chainId: 1337
    },
    mumbai:{
      url:`https://polygon-mumbai.g.alchemy.com/v2/eGVSl3mZHQco4fxinOtwyGgOUIFrPIlg`,
      accounts:[privateKey]
    },
    mainnet:{
      url:`https://polygon-mainnet.g.alchemy.com/v2/JYtes1MBpVi12vocZuoEpvKsFfSjYJN7`,
      accounts:[privateKey]
    }
  },
  solidity: "0.8.4",
};
