"use client"


//!Custom components
import { Navbar,Footer,Breadcrumbs,Hero } from '@components/ui/common'
import { Ethrate,Wallet } from '@components/ui/web3'
import { CourseList } from '@components/ui/course'
import { OrderCard } from '@components/ui/order'
import { BaseLayout } from '@components/ui/layout'

import { useWeb3 } from '@components/providers/web3'


//!Home
export default function Home() {
  let {provider,web3,contract,isLoading} = useWeb3()

  return (
        <>
          <BaseLayout>
            {isLoading ? 'Web3 is loading...' : web3 ? 'Web3 is ready' : 'Please install metamask'}
            <Hero/>
            <CourseList/>
          </BaseLayout>
        </>
  )
}
