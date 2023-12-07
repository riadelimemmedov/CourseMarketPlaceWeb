
//!Helpers methods
import { Breadcrumbs } from "@components/ui/common"
import { Ethrate, Wallet } from "@components/ui/web3"


//LINKS
const LINKS = [
    {
        href:"/marketplace",
        value:"Buy"
    },
    {
        href:"/marketplace/courses/owned",
        value:"My Courses"
    },
    {
        href:"/marketplace/courses/manage",
        value:"Manage Courses"
    }
]

//*Header
export default function Header() {
    return (
        <>
            <Wallet/>
            <Ethrate/>
            <div className='flex flex-row-reverse pb-4 px-4 sm:px-6 lg:px-8'>
                <Breadcrumbs items={LINKS}/>
            </div>
        </>
    )
}