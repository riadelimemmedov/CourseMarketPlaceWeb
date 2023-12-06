
//!Helpers methods
import { Breadcrumbs } from "@components/ui/common"
import { Ethrate, Wallet } from "@components/ui/web3"


//*Header
export default function Header() {
    return (
        <>
            <Wallet/>
            <Ethrate/>
            <div className='flex flex-row-reverse pb-4 px-4 sm:px-6 lg:px-8'>
                <Breadcrumbs/>
            </div>
        </>
    )
}