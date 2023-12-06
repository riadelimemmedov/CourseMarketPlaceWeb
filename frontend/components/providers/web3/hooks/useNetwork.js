//!React
import { useEffect } from "react"
import useSWR from "swr"


//!Get Chain Name
const find = require("@raiddotfarm/get-chain-name");


//network_whitelist
const network_whitelist = [
    'Sepolia',
]


//?handler
export const handler = (web3,provider) => {
    const {mutate,...rest} = useSWR(() => 
        web3 ? "web3/network" : null,
        async () => {
            const chainId = await web3.eth.getChainId().then((response) => response.toString());
            const chainName = find(Number(chainId.toString()))
            const isSupported = network_whitelist.includes(chainName)
            return {'chainId': chainId, 'chainName': chainName,'isSupported': isSupported}
        }
    ) 

    useEffect(() => {
        provider &&
        provider.on('chainChanged', chainId => mutate(chainId))
    },[web3])
    
    return {network : {
        mutate,
        ...rest
    }}

}