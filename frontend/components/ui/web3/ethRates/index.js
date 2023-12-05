import Image from "next/legacy/image"


//!Ethrate
export default function Ethrate({eth}){
    return(
        <div className="grid grid-cols-4 mb-5 mt-5">
            <div className="flex flex-1 items-stretch text-center">
                <div className="p-10 border drop-shadow rounded-md">
                    <div className="flex items-center">
                        <Image layout="fixed" height="35" width="35" src="https://raw.githubusercontent.com/Jerga99/eth-marketplace-course/main/public/small-eth.webp"/>
                        <span className="text-2xl font-bold">ETH = {eth}$</span>
                    </div>
                    <p className="text-xl text-gray-500 text-center">Current eth Price</p>
                </div>
            </div>
        </div>
    )
}