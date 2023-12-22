//!Third part packages
const web3 = require("../utils/web3/web3.js")
const fs = require("fs")

//!ABI and ByteCode
const CourseMarketPlace = require('../public/contracts/CourseMarketPlace.json')


//?deployContract
const deployContract = async () => {
  const accounts = await web3.eth.getAccounts()

  const factory = await new web3.eth.Contract(CourseMarketPlace.abi)
      .deploy({data:CourseMarketPlace.bytecode})
      .send({from:accounts[0],gas:'4712388'})//if increase number of block in node supervise gas fees value 
  
  const filePath = "../data/CourseMarketPlaceDeployed.json"
  const contractData = {'abi':CourseMarketPlace.abi,'network':'local','address':CourseMarketPlace.networks[5777].address}
  fs.writeFileSync(filePath,JSON.stringify(contractData))
  return {factory}
}
deployContract()
module.exports = {deployContract}