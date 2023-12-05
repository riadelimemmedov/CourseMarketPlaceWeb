"use client"

//!Custom components
import { Navbar,Footer,Breadcrumbs,Hero, Button, Modal } from '@components/ui/common'
import { Ethrate,Wallet } from '@components/ui/web3'
import { CourseList } from '@components/ui/course'
import { OrderCard, OrderModal } from '@components/ui/order'
import { BaseLayout } from '@components/ui/layout'


//!Helpers functions and methods
import { useWeb3 } from '@components/providers/web3'
import { useAccount } from '@components/hooks/web3/useAccount'
import { useNetwork } from '@components/hooks/web3/useNetwork'
import { useEthPrice } from '@components/hooks/useEthPrice'



//*Home
export default function Marketplace({course}) {
    const { account } = useAccount()
    const { network }  = useNetwork()
    const { connect,isLoading,error_code,web3} = useWeb3()
    const { eth } = useEthPrice()

    //return jsx to client
    return (
        <>
            <BaseLayout>
                <div className="py-4">
                    <Wallet address={account.data} network={network.data} web3={web3} isLoading={isLoading}/>
                    <Ethrate eth={eth.data}/>
                </div>
                <CourseList/>
            </BaseLayout>
        </>
    )
}
