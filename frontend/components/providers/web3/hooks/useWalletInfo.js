
//!Helpers methods
import { useNetwork } from "@components/hooks/web3/useNetwork"
import { useAccount } from "@components/hooks/web3/useAccount"



//?useWalletInfo
export const useWalletInfo = () => {
    const { account } = useAccount()
    const { network } = useNetwork()

    return {
        account,
        network,
        isCanPurchaseCourse : network.data ? !!(account.data && network.data.isSupported) : null
    }
}