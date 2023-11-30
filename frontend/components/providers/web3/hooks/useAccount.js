//!React
import { useEffect } from "react"
import useSWR from "swr"

//!Helpers method and functions
import generateKeccak256 from "utils/keccak256_generate";


const adminAddresses = {
    "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f":true
}

//?handler
export const handler = (web3,provider) => {

    const {data,mutate,...rest} = useSWR(() => 
        web3 ? "web3/accounts" : null,
        async () => {
            const accounts = await web3.eth.getAccounts()
            let is_admin = adminAddresses[accounts[0]]
            if(is_admin) {
                delete adminAddresses[accounts[0]] 
                adminAddresses[`0x${generateKeccak256(accounts[0])}`] = is_admin
            }
            return accounts[0]
        }
    ) 

    useEffect(() => {
        provider && 
        provider.on('accountsChanged', accounts => mutate(accounts[0] ?? null))//Update cache
    },[provider])
    

    return {account : {data,mutate,isAdmin:(data != undefined && adminAddresses[web3.utils.keccak256(data)]) ?? false,...rest}}
}