const assert = require("assert");
const web3 = require("web3");

const Tether = artifacts.require("Tether");
const Reward = artifacts.require("Reward");
const DecentralizedBank = artifacts.require("DecentralizedBank");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("DecentralizedBank", ([owner, customer]) => {
  let tether, rwd, dBank;
  const tokens = number => web3.utils.toWei(number, "ether");

  before(async () => {
    //loading contracts
    tether = await Tether.new();
    rwd = await Reward.new();
    dBank = await DecentralizedBank.new(rwd.address, tether.address);

    //transfer all reward tokens to bank (1M)
    await rwd.transfer(dBank.address, tokens("1000000"));

    //transfer tether tokens to investors (100)
    await tether.transfer(customer, tokens("100"), {
      from: owner,
    });
  });

  describe("Mock Tether deployment", async () => {
    it("matches name successfully", async () => {
      const name = await tether.name();
      assert.equal(name, "Tether");
    });
  });

  describe("Mock reward deployment", async () => {
    it("matches name successfully", async () => {
      const name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
  });

  describe("Decentralized bank deplyment", async () => {
    it("matches name successfully", async () => {
      const name = await dBank.name();
      assert.equal(name, "Decentral Bank");
    });

    it("contract has tokens", async () => {
      let balance = await rwd.balanceOf(dBank.address)
      assert.equal(balance, tokens('1000000'))
    })
  });


});
