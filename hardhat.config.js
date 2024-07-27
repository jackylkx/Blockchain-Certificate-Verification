/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Default Hardhat network URL
    },
    optimism_sepolia: {
      url: `https://sepolia.optimism.io`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    },
  },
};
