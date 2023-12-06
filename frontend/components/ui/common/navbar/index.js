"use client"

//!React and Next 
import Link from 'next/link'
import { usePathname } from 'next/navigation'


//!Helpers functions
import { useWeb3 } from '@components/providers/web3'
import { useWalletInfo } from '@components/providers/web3/hooks/useWalletInfo'

//!Custom components
import {Button} from '@components/ui/common'

//*Navbar
export default function Navbar(){
    const { connect,isLoading,error_code,web3} = useWeb3()
    const {account,network} = useWalletInfo()

    const pathname = usePathname()


    //return jsx to client
    return(
        <section>
            <span>Is star web3 : </span> - <span className='text-green-500'>{account.data}</span>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                <nav className="relative" aria-label="Global">
                    <div className="flex justify-between">
                        <div>
                            <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                                Metaverse Planet Academy
                            </Link>

                            <Link href="/marketplace" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                                Marketplace
                            </Link>

                            <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                                Blogs
                            </Link>
                        </div>

                        <div>
                            <a href="#" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Company</a>
                            {
                                isLoading ? 
                                    <Button disabled={true} onClick={connect} className="cursor-pointer w-40">
                                        Loading...
                                    </Button>
                                :
                                    web3 ? account.data ?
                                    <Button hoverable={false} className="cursor-pointer w-40">
                                        Hi there {account.isAdmin && "- Admin"}
                                    </Button>
                                :
                                    <Button onClick={connect} className="cursor-pointer w-40">Connect</Button>
                                :
                                    <Button onClick={() => window.open("https://metamask.io/download.html")} className="cursor-pointer w-40">Install Metamask</Button>
                            }
                            
                            <div class="flex justify-center md:inline pl-7">
                                <a class="relative text-gray-700 hover:text-gray-600" href="#">
                                    <svg class="h-5 w-5 md:inline" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span class="absolute top-0 left-0 rounded-full bg-indigo-500 text-white p-1 text-xs"></span>
                                </a>
                            </div>
                        </div>

                    </div>
                </nav>
            </div>
            <div>
                {account.data && !pathname.includes('/marketplace') &&
                    <div className='flex justify-end pt-1 mr-11 sm:px-6 lg:px-8'>
                        <div className='text-white bg-indigo-600 rounded-md p-2'>
                            {account.data}
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}