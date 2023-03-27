const { ethers } = require("hardhat");

async function main() {
  const tokenFactory = await ethers.getContractFactory("FakeToken");
  const tokenContract = await tokenFactory.deploy("shitcoin", "sht");
  await tokenContract.deployed();
  console.log(`Token address: ${tokenContract.address}`);
  const airdropFactory = await ethers.getContractFactory("AirdropToken");
  const airdropContract = await airdropFactory.deploy();
  await airdropContract.deployed();
  console.log(`airdrop address: ${airdropContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
