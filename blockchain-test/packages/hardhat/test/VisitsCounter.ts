import { expect } from "chai";
//import { ethers } from "hardhat";
const { ethers } = require("hardhat");
import { VisitsCounter } from "../typechain-types";

describe("VisitsCounter", function () {
  // We define a fixture to reuse the same setup in every test.

  let visitsCounter: VisitsCounter;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const yourContractFactory = await ethers.getContractFactory("VisitsCounter");
    visitsCounter = (await yourContractFactory.deploy(owner.address)) as VisitsCounter;
    await visitsCounter.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should have the right message on deploy", async function () {
      expect(await visitsCounter.greeting()).to.equal("Building Unstoppable Apps!!!");
    });

    it("Should allow setting a new message", async function () {
      const newGreeting = "Learn Scaffold-ETH 2! :)";

      await visitsCounter.setGreeting(newGreeting);
      expect(await visitsCounter.greeting()).to.equal(newGreeting);
    });
  });
});
