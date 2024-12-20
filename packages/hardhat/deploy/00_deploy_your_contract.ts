import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { VotingContract } from "../typechain-types";

const deployVotingContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();

  const { deploy } = hre.deployments;

  await deploy("VotingContract", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  const votingContract = await hre.ethers.getContract<VotingContract>("VotingContract", deployer);

  console.log("👋 Initial greeting:", await votingContract.greeting());
};

export default deployVotingContract;

deployVotingContract.tags = ["VotingContract"];
