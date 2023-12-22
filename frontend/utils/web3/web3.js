//!Third party packages
const {Web3} = require('web3');

//Connect web3.js to localhost development server
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")) 

//Export web3 
module.exports = web3
