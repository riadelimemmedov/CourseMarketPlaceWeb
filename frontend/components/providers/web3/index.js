"use client"

//!React and Next
import { createContext,useContext,useEffect, useMemo, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";


import { toast } from 'react-toastify'


//?Web3Context
const Web3Context = createContext(null)


import { useRouter } from 'next/navigation'


//*Web3Provider
export default function Web3Provider({children}){
    const router = useRouter()


    const [web3Api,setWeb3Api] = useState({
        provider:null,
        web3:null,
        contract:null,
        isLoading:true
    })
    

    //throwNotification
    const throwNotification = (notification_message=null,notification_type=null) => {
        notification_type === 'success' ? toast.success(`${notification_message}`) : notification_type === 'error' ? toast.error(`${notification_message}`) : notification_type === 'info' ? toast.info(`${notification_message}`) : null;
    }


    //loadProvider
    const loadProvider = async () => {
        const provider = await detectEthereumProvider()
        if(provider){
            const web3 = new Web3(provider)
            setWeb3Api({
                provider:provider,
                web3:web3,
                contract: null,
                isLoading: false
            })
        }   
        else{
            setWeb3Api(api => ({...api,isLoading:false}))
        }
    }

    //_web3Api
    const _web3Api = useMemo(() => {
        const {provider,web3,contract,isLoading} = web3Api
        return{
            ...web3Api,
            requireInstall: !isLoading && !web3,
            connect:provider ? 
                async (e) => {
                    try {
                        let accounts = await provider.request({method: "eth_requestAccounts"})
                        accounts.length > 0 ? throwNotification('You have already connected','info') : null
                    }
                    catch(err){
                        throwNotification('Please try again','error')
                        // router.reload(window.location.pathname)
                    }
                }
                :
                () => toast.error("Please install metamask")
        }
    },[web3Api])


    useEffect(() => {
        loadProvider()
    },[])

    return(
        <Web3Context.Provider value={_web3Api}>
            {children}
        </Web3Context.Provider>
    )
}


//*useWeb3
export function useWeb3(){
    return useContext(Web3Context)
}