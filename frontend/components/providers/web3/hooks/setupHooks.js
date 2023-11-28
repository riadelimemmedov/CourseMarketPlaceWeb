import { handler as createUseAccount } from "./useAccount";


//?setupHooks
export const setupHooks = web3 => {
    return{
        useAccount:createUseAccount(web3)
    }
} 