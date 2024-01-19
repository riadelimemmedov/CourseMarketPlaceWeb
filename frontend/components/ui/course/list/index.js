"use client"

//!React and Next
import { useEffect, useState } from "react"
import Image from "next/legacy/image"
import Link from 'next/link'
import { usePathname } from 'next/navigation'


//!Third party packages
import ReactPaginate from 'react-paginate';

//!Pagination classess
import '../../../../styles/pagination.css'


//!Custom components
import { CourseCard } from "@components/ui/course";
import { BetaModal, Button, CoursePrice, Spinner } from "@components/ui/common";
import { OrderModal } from "@components/ui/order";


//!Helpers functions
import { useWeb3 } from "@components/providers/web3";
import { useEthPrice } from "@components/hooks/useEthPrice";
import { useWalletInfo } from "@components/providers/web3/hooks/useWalletInfo"


//*List
export default function List(){
    //state
    const [selectedCourse,setSelectedCourse] = useState(null)
    const [courses,setCourse] = useState([])
    const [itemOffset, setItemOffset] = useState(0);
    const { isLoading,web3,contract } = useWeb3()
    const { eth } = useEthPrice()
    const {account,network,isCanPurchaseCourse} = useWalletInfo()


    //pagination
    let itemsPerPage = 4
    const endOffset = itemOffset + itemsPerPage;
    const current_courses = courses.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(courses.length / itemsPerPage);


    //getAllCourses
    const get_all_courses = async () => {
        fetch(`${process.env.api_root_endpoint}/courses/`)
            .then((response) => response.json())
            .then((data) => {
                setCourse(data)
        })
    }


    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % courses.length;
        setItemOffset(newOffset);
    };

    const purchaseCourse = async order => {
        // const hexCourseId1 = web3.utils.utf8ToHex("896464");
        // console.log("🚀 ~ file: index.js:65 ~ purchaseCourse ~ hexCourseId1:", hexCourseId1)
        const hexCourseId = web3.utils.padRight(web3.utils.utf8ToHex(selectedCourse.id.toString()), 32);
        console.log("🚀 ~ file: index.js:66 ~ purchaseCourse ~ hexCourseId:", hexCourseId)


        const orderHash = web3.utils.soliditySha3(
        { type: "bytes16", value: hexCourseId },
        { type: "address", value: account.data }
        )
        console.log("🚀 ~ file: index.js:73 ~ purchaseCourse ~ orderHash:", orderHash)


        const emailHash = web3.utils.sha3(order.email)
        const proof = web3.utils.soliditySha3(
        { type: "bytes32", value: emailHash},
        { type: "bytes32", value: orderHash.replace(orderHash.slice(0,4),"2e")},
        )
        
        console.log("🚀 ~ file: index.js:79 ~ purchaseCourse ~ proof:", proof)

        const value = web3.utils.toWei(Number(order.price),'ether')

        // console.log("🚀 ~ file: index.js:80 ~ purchaseCourse ~ value:", value)

        // const hex_byte = web3.utils.hexToBytes(web3.utils.padLeft(value, 32));
        console.log("🚀 ~ file: index.js:91 ~ purchaseCourse ~ value:", value)


        try {
        const result = await contract.methods.purchaseCourse(
            hexCourseId,
            proof
        ).send({from: account.data, value:value, gas:'4712388'})
        console.log(result)
    } catch (err){
        console.error("Purchase course: Operation has failed.", err)
    }
    }

    // const purchaseCourse = async order => {
    //     const hexCourseId = web3.utils.utf8ToHex("896464");

        
    //     console.log("Hex course id", hexCourseId)
    //     console.log("Sender value is", account.data)

    //     const orderHash = web3.utils.soliditySha3(
    //         { type: "bytes16", value: Number(hexCourseId)},
    //         { type: "address", value: account.data }
    //     )   

    //     console.log("🚀 ~ file: index.js:70 ~ purchaseCourse ~ orderHash:", orderHash)
        
    //     let random_number = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

    //     let result_order_hash = orderHash.slice(0, 2) + random_number + orderHash.slice(2 + 1);

    //     const emailHash = web3.utils.sha3(order.email)
    //     console.log("🚀 ~ file: index.js:81 ~ purchaseCourse ~ emailHash:", emailHash)
    //     let result_email_hash = emailHash.slice(0, 2) + random_number + emailHash.slice(2 + 1);
    //     console.log('After update email hash ', result_email_hash)
        

    //     console.log("🚀 ~ file: index.js:72 ~ purchaseCourse ~ emailHash:", emailHash) 

    //     const proof = web3.utils.soliditySha3(
    //         { type: "bytes32", value: result_email_hash },
    //         { type: "bytes32", value: result_order_hash }
    //     )
    //     console.log("🚀 ~ file: index.js:77 ~ purchaseCourse ~ proof:", proof)
    
    //     const hexString = String(hexCourseId);
    //     const paddedHexString = hexString.slice(2).padStart(32, "0");
    //     const bytes16Value = web3.utils.hexToBytes(paddedHexString);



    //     const value = web3.utils.toWei(Number(order.price),'ether')
            
    //     try {
    //         const result = await contract.methods.purchaseCourse(
    //             bytes16Value,
    //             proof
    //         ).send({from: account.data, value:value, gas:'4712388'})
    //         console.log(result)
    //     } catch(err) {
    //         console.error("Purchase course: Operation has failed.", err)
    //     }
    // }


    //useEffect
    useEffect(()=>{
        get_all_courses()
    },[])


    //return jsx to client
    return(
        <>
            {
                isLoading == false ?
                    <div>
                        <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
                            { current_courses.map((course, index) =>
                                <>
                                    <CourseCard course={course} index={index} disabled={!isCanPurchaseCourse} Footer={() => (
                                        <>
                                            <div className="mt-20 flex flex-1 items-stretch text-center">
                                                <Button onClick={() => setSelectedCourse(course)} className="pr-5 pl-5 pt-3 pb-3 mt-8 flex items-center" variant="lightPurple" disabled={!isCanPurchaseCourse}>
                                                    Purchase Now - <CoursePrice eth={eth} course={course} />
                                                    <Image layout="fixed" height="35" width="35" src="https://raw.githubusercontent.com/Jerga99/eth-marketplace-course/main/public/small-eth.webp"/>
                                                </Button>
                                            </div>
                                            <div>
                                                <div className="mt-2 flex flex-1 items-stretch text-center">
                                                    <Button variant="paypal" className="w-66 pr-4 pl-4 pt-4 pb-4">
                                                        Purchase Now - 
                                                        <img src="https://www.vectorlogo.zone/logos/stripe/stripe-ar21.svg" class="w-14 ml-1 me-2 -ms-1" alt="" />
                                                    </Button>
                                                </div>
                                                
                                            </div>
                                        </>
                                        
                                        
                                        
                                    )}/>
                                </>
                            )}
                            {
                                selectedCourse &&
                                    <OrderModal eth={eth} onSubmit={purchaseCourse} course={selectedCourse} onClose={() => setSelectedCourse(null)}/>
                            }
                        </section>
                        <ReactPaginate
                            pageCount={pageCount} 
                            pageRangeDisplayed={5} 
                            marginPagesDisplayed={2} 
                            onPageChange={handlePageClick} 
                            containerClassName={'pagination'} 
                            activeClassName={'active'} 
                            disabled={true}
                        />
                    </div>
                    :
                    <Spinner/>
            }
        </>
    )
}
