/* eslint-disable no-undef */
/** @type import('hardhat/config').HardhatUserConfig */
import "dotenv/config";

import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";

export const solidity = {
  compilers: [
    { version: "0.8.17" },
    { version: "0.7.6" },
    { version: "0.6.6" }
  ]
};
export const networks = {
  sepolia: {
    url: `https://eth-sepolia.g.alchemy.com/v2${process.env.ALCHEMY_API_KEY}`,
    accounts: [process.env.USER1_PRIVATE_KEY,],
  },
  mainnet: {
    url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
    accounts: [process.env.USER1_PRIVATE_KEY,],
  },
  local: {
    url: `http://127.0.0.1:8545`,
    accounts: [process.env.USER1_PRIVATE_KEY,],
  },
};
export const etherscan = {
  apiKey: process.env.ETHERSCAN_API_KEY,
};
export const mocha = {
  timeout: 100000000
};