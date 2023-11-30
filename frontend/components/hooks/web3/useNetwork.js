//!useHooks 
import { useHooks } from "@components/providers/web3"


//?useNetwork
export const useNetwork = () => {
    return useHooks(hooks => hooks.useNetwork)
}