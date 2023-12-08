
//!React and Next
import Image from "next/legacy/image"


//!Helpers methods
import { useEthPrice } from "@components/hooks/useEthPrice"
import { Loader } from "@components/ui/common"


//!Css classess
import '../../../../styles/loader.css'


//*Ethrate
export default function Ethrate(){
    const { eth } = useEthPrice()

    //return jsx to client
    return(
        <div className="grid grid-cols-4 mb-5 mt-5">
            <div className="flex flex-1 items-stretch text-center">
                <div className="p-10 border drop-shadow rounded-md">
                    <div className="flex items-center">
                        {!eth.data ?
                            <div className="w-full flex justify-center">
                                <Loader size='md'/>
                            </div>
                            :
                            <>
                                <Image layout="fixed" height="35" width="35" src="https://raw.githubusercontent.com/Jerga99/eth-marketplace-course/main/public/small-eth.webp"/>
                                <span className="text-2xl font-bold">ETH = {eth.data}$</span>
                            </>
                        }
                        
                    </div>
                    <p className="text-xl pt-2 text-gray-500 text-center">Current eth Price</p>
                </div>
            </div>
        </div>
    )
}