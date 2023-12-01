"use client"

//!React and Next
import { createContext,useContext,useEffect, useMemo, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { useRouter } from 'next/navigation'

//!Notification
import notification from '../../../utils/notification.js'
import { setupHooks } from "./hooks/setupHooks.js";


//?Web3Context
const Web3Context = createContext(null)


//*Web3Provider
export default function Web3Provider({children}){
    const router = useRouter()

    const [web3Api,setWeb3Api] = useState({
        provider:null,
        web3:null,
        contract:null,
        isLoading:true
    })


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
            getHooks:() => setupHooks(web3,provider),
            connect:provider ? 
                async (e) => {
                    try {
                        let accounts = await provider.request({method: "eth_requestAccounts"})
                        accounts.length > 0 ? notification.throwNotification('You have already connected','info',null) : null
                    }
                    catch(err){
                        if(err.code && err.message){
                            notification.throwNotification(`${err.message} Or click to Metamask extension.`,'info',`${err.code}`)    
                        }
                        // router.reload(window.location.pathname)
                    }
                }
                :
                () => notification.throwNotification("Please install metamask",'info',null)
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

//*useHooks
export function useHooks(cb){
    const {getHooks} = useWeb3()
    return cb(getHooks())
}