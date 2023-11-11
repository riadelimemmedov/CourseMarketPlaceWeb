
//!Custom components
import { Navbar,Footer,Breadcrumbs,Hero } from '@components/common'
import { Ethrate,Wallet } from '@components/web3'
import { CourseList } from '@components/course'
import { OrderCard } from '@components/order'
import { BaseLayout } from '@components/layout'

import axios from 'axios'


//!Home
export default function Home() {
  return (
        <>
          <BaseLayout>
            <Hero/>
            <CourseList/>
          </BaseLayout>
        </>
  )
}
