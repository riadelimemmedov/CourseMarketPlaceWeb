//!useHooks 
import { useHooks } from "@components/providers/web3"


//?useAccount
export const useAccount = () => {
    return useHooks(hooks => hooks.useAccount)
}