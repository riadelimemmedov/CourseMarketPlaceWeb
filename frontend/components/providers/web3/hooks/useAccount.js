//!React
import { useEffect } from "react"
import useSWR from "swr"


const adminAddresses = {
    "":true
}

//?handler
export const handler = (web3,provider) => {

    const {data,mutate,...rest} = useSWR(() => 
        web3 ? "web3/accounts" : null,
        async () => {
            const accounts = await web3.eth.getAccounts()
            return accounts[0]
        }
    ) 

    useEffect(() => {
        provider && 
        provider.on('accountsChanged', accounts => mutate(accounts[0] ?? null))//Update cache
    },[provider])

    return {account : {data,mutate,isAdmin:(data && adminAddresses[data]) ?? false,...rest}}
}