require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.11",
  networks: {
    mumbai: {
      url: `https://speedy-nodes-nyc.moralis.io/${process.env.POLYGON_MUMBAI}/polygon/mumbai`,
      accounts: [`${process.env.PRIVATE_KEY}`]
    },
  },
  etherscan: {
    apiKey: `${process.env.API_KEY}`
  },
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
};
