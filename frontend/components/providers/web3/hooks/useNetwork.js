//!React
import { useEffect } from "react"
import useSWR from "swr"


const find = require("@raiddotfarm/get-chain-name");


//?handler
export const handler = (web3,provider) => {
    const {mutate,...rest} = useSWR(() => 
        web3 ? "web3/network" : null,
        async () => {
            const chainId = await web3.eth.getChainId().then((response) => response.toString());
            const chainName = find(Number(chainId.toString()))
            return {'chainId': chainId, 'chainName': chainName}
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