//!Keccak256
const keccak256 = require('keccak256')


//generateKeccak256
const generateKeccak256 = (wallet_address) => {
    return keccak256(wallet_address).toString('hex')
}
export default generateKeccak256
