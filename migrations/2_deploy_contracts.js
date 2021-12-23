const Tether = artifacts.require("Tether");
const Reward = artifacts.require("Reward");
const DecentralizedBank = artifacts.require("DecentralizedBank");

module.exports = async function(deployer, network, accounts) {
  //deploying contracts
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();
  await deployer.deploy(Reward);
  const reward = await Reward.deployed();
  await deployer.deploy(DecentralizedBank, reward.address, tether.address);
  const decentralized_bank = await DecentralizedBank.deployed();

  //transfer reward tokens to the back
  await reward.transfer(decentralized_bank.address,"1000000000000000000000000");

  //transfer tether tokens to investors
  await tether.transfer(accounts[1], "100000000000000000000");
};
