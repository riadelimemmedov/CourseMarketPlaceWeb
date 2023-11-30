"use client"

//!Custom components
import { Navbar,Footer,Breadcrumbs,Hero } from '@components/ui/common'
import { Ethrate,Wallet } from '@components/ui/web3'
import { CourseList } from '@components/ui/course'
import { OrderCard } from '@components/ui/order'
import { BaseLayout } from '@components/ui/layout'

//!Helpers functions and methods
import { useWeb3 } from '@components/providers/web3'
import { useAccount } from '@components/hooks/web3/useAccount'
import { useNetwork } from '@components/hooks/web3/useNetwork'
import { useState } from 'react'



//*Home
export default function Marketplace({courses}) {
    const { account } = useAccount()
    const { network }  = useNetwork()

    return (
        <>
            <BaseLayout>
                <div className="py-4">
                    <Wallet address={account.data} network={network.data}/>
                </div>
                <CourseList/>
            </BaseLayout>
        </>
    )
}
