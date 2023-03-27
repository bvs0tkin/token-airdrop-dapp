require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const BNBT_PRIVATE_KEY = process.env.BNBT_PRIVATE_KEY;
const BNBT_RPC_URL = process.env.BNBT_RPC_URL

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    bnbt: {
      url: BNBT_RPC_URL,
      accounts: [BNBT_PRIVATE_KEY],
      chainId: 97,
    },
  },
  solidity: "0.8.18",
};
