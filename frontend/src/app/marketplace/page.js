"use client"

//!Custom components
import { Navbar,Footer,Breadcrumbs,Hero, Button, Modal } from '@components/ui/common'
import { Ethrate,Wallet } from '@components/ui/web3'
import { CourseList } from '@components/ui/course'
import { OrderCard, OrderModal } from '@components/ui/order'
import { BaseLayout } from '@components/ui/layout'
import { Header } from '@components/ui/marketplace'


//!Helpers functions and methods
import { useWeb3 } from '@components/providers/web3'
import { useEthPrice } from '@components/hooks/useEthPrice'
import { useWalletInfo } from '@components/providers/web3/hooks/useWalletInfo'


//*Home
export default function Marketplace({course}) {
    //return jsx to client
    return (
        <>
            <BaseLayout>
                <div className="py-4">
                    <Header/>  
                </div>
                <CourseList/>
            </BaseLayout>
        </>
    )
}
