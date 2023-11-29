import { handler as createUseAccount } from "./useAccount";


//?setupHooks
export const setupHooks = (...deps) => {
    return{
        useAccount:createUseAccount(...deps)
    }
} 