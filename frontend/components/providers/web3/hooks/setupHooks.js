import { handler as createAccountHook } from "./useAccount";
import {handler as createNetworkHook } from "./useNetwork";


//?setupHooks
export const setupHooks = (...deps) => {
    return{
        useAccount:createAccountHook(...deps),
        useNetwork:createNetworkHook(...deps)
    }
} 