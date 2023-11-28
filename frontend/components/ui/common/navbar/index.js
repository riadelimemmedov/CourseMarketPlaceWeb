"use client"

//!React and Next 
import Link from 'next/link'


//!Helpers functions
import { useWeb3 } from '@components/providers/web3'
import { useAccount } from '@components/web3/hooks/useAccount'


//*Navbar
export default function Navbar(){
    const { connect,isLoading,error_code,web3} = useWeb3()
    const {account}  = useAccount()


    return(
        <section>
            <span>Is star web3 : </span> - <span className='text-green-500'>{account}</span>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                <nav className="relative" aria-label="Global">
                    <div className="flex justify-between">
                        <div>
                            <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                                Metaverse Planet Academy
                            </Link>

                            <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                                Marketplacecke
                            </Link>

                            <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                                Blogs
                            </Link>
                        </div>

                        <div>
                            <a href="#" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Company</a>
                            
                            <button onClick={account == null ? connect : null} disabled={isLoading != true ? false : true}  className={`px-8 py-3 border rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 ${isLoading == true ? "disabled:opacity-50 disabled:cursor-not-allowed" : "" }`}>
                                Connect Wallet
                            </button>

                            
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
        </section>
    )
}