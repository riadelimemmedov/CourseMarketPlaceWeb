//!Hardhat 
const hre = require("hardhat");

//!Node js
const fs = require("fs");


//*The 'main' function to deploy contract locally
async function main() {

  //Get deployer address
  const [deployer] = await hre.ethers.getSigners()

  //Get deployer account balance
  const account_balance = await deployer.provider.getBalance(deployer.address)


  //Logging deployer account address and deployer account balance on terminal
  console.log('Deployer is ', deployer.getAddress())
  console.log('Deployer address balance is ', account_balance)

  //Deploy contract
  const contracts = await hre.ethers.getContractFactory('CourseMarketPlace')
  const contract = await contracts.deploy()
  await contract.deployed() // Wait until the contract is deployed successfully.


  //Logging the address of the deployed contract
  console.log('Contract address is ', contract.address)


  //Get sender user addresss,well you know who deploy that is contract
  const receipt = await contract.deployTransaction.wait() // Line of code is waiting for the deployment transaction to be included in six blocks on the Ethereum blockchain. This is done to ensure that the transaction has sufficient confirmations, which helps to ensure the transaction will not be reversed and more secure.
  console.log('Deployed receipt is ', receipt.from)


  //Verify source code in etherscan
  if (hre.network.name === 'sepolia') {
    try {
      await hre.run("verify:verify", {
        address: contract.address,
        constructorArguments: [], //If you have passed contract address arguments sent to contract,if you want
      })
    } catch (e) {
      if (e.message.toLowerCase().includes('already verified')) {
        console.log('Already verified')
      } else {
        console.log('Returned error when verified contract')
      }
    }
    console.log('Contract verified')
  }
}

//*validateMain
const validateMain = async () => {
  try {
    await main()
    process.exit(0) //run code without problem
  } catch (err) {
    console.log('Err', err)
    process.exit(1)
  }
}

//Cal the validateMain function validate contract is deployed successfully or not by from hardhat.
validateMain()