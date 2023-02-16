const hre = require("hardhat");

async function main() {
  const MedBlocks = await hre.ethers.getContractFactory("MedBlocks");
  const contract = await MedBlocks.deploy();

  await contract.deployed();

  console.log(`Deployed to :${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//Goerli: 0x52b9400A6F7126D430f8da34155144B611d82e6B
