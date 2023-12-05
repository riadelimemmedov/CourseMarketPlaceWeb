"use client"

//!React and Next
import { useEffect, useState } from "react"
import Image from "next/legacy/image"
import Link from 'next/link'

//!Third party packages
import ReactPaginate from 'react-paginate';

//!Pagination classess
import '../../../../styles/pagination.css'


//!Custom components
import { CourseCard } from "@components/ui/course";
import { Button, Spinner } from "@components/ui/common";
import { OrderModal } from "@components/ui/order";


//!Helpers functions
import { useWeb3 } from "@components/providers/web3";
import { useEthPrice } from "@components/hooks/useEthPrice";


//*List
export default function List(){
    //state
    const [selectedCourse,setSelectedCourse] = useState(null)
    const [courses,setCourse] = useState([])
    const [itemOffset, setItemOffset] = useState(0);
    const { isLoading } = useWeb3()
    const { eth } = useEthPrice()


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
                                <CourseCard course={course} index={index} Footer={() => (
                                    <div className="mt-20 flex flex-1 items-stretch text-center">
                                        <Button onClick={() => setSelectedCourse(course)} className="pr-5 pl-5 flex items-center" variant="lightPurple">
                                            Purchase Now -  <span className="font-bold"> &nbsp; {eth.data ? (course.price / eth.data).toFixed(5) : 'Loading...'} </span>
                                            <Image layout="fixed" height="35" width="35" src="https://raw.githubusercontent.com/Jerga99/eth-marketplace-course/main/public/small-eth.webp"/>
                                        </Button>
                                    </div>
                                )}/>
                            </>
                        )}
                        {
                            selectedCourse &&
                                <OrderModal course={selectedCourse} onClose={() => setSelectedCourse(null)}/>
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
