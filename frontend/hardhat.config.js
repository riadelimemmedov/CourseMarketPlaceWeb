require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

require('dotenv').config({path:"../.env"})

module.exports = {
  solidity: "0.8.19",
  settings:{
    optimizer: {
      enabled: true,
      runs: 200,
    },
    evmVersion: "byzantium", // Hardfork to enable unlimited contract size
  },
  networks:{
    sepolia:{
      url:process.env.SEPOLIA_NODE_URL_HTTPS,
      accounts:[process.env.METAMASK_PRIVATE_KEY],
      chainId:11155111
    }
  },
  etherscan:{
    apiKey:process.env.API_KEY_SEPOLIA,
  },
  defaultNetwork:"hardhat",
};
