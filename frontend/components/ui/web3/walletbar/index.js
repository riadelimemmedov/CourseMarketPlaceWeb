//!Helpers methods
import { useWeb3 } from "@components/providers/web3"
import { useWalletInfo } from "@components/providers/web3/hooks/useWalletInfo"
import { Button } from "@components/ui/common"


//*Wallet
export default function Wallet(){
    const {account,network,isCanPurchaseCourse} = useWalletInfo()
    const { connect,isLoading,error_code,web3} = useWeb3()


    
    //return jsx to client
    return(
        <section className="text-white bg-indigo-600 rounded-lg">
            <div className="p-8">
                <h1 className="text-base xs:text-xl break-words">Hello, {account.data}</h1>
                <h2 className="subtitle mb-5 text-small xs:text-base">I hope you are having a great day!</h2>
                <div className="flex justify-between items-center">
                    <div className="sm:flex sm:justify-center lg:justify-start">
                        <Button variant="white" className="mr-2 text-sm xs:text-lg p-4">
                            Learn how to purchase
                        </Button>
                    </div>
                    <div>
                        {
                            network.data !== undefined && (
                                network.data.isSupported ? (
                                    <div>
                                        <span>
                                            Currently on &nbsp;
                                        </span>
                                        <strong className="text-2xl">
                                            {network.data.chainName}
                                        </strong>
                                    </div>
                            ) : (
                                <div className="bg-red-400 p-4 rounded-lg">
                                    <div>Connected to wrong network</div>
                                    <div>
                                        Connect to: {` `}
                                        <strong className="text-2xl">
                                            Sepolia
                                        </strong>
                                    </div>
                                </div>
                            )
                            )
                        }
                        {
                            isLoading == false && network.data === undefined && web3 === null && (
                                <div className="bg-yellow-500 p-4 rounded-lg">
                                    Cannot connect to network. Please install Metamask.
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}