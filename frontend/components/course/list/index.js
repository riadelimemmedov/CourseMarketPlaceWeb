"use client"

//!React and Next
import { useEffect, useState } from "react"
import Image from "next/legacy/image"
import Link from 'next/link'

//!Third party packages
import ReactPaginate from 'react-paginate';

//!Pagination classess
import '././../../../styles/pagination.css'



//*List
export default function List(){
    //state
    const [courses,setCourse] = useState([])
    const [itemOffset, setItemOffset] = useState(0);


    //pagination
    let itemsPerPage = 4
    const endOffset = itemOffset + itemsPerPage;
    const current_courses = courses.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(courses.length / itemsPerPage);


    //getAllCourses
    const getAllCourses = async () => {
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

    useEffect(()=>{
        getAllCourses()
    },[])


    return(
        <>
            <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
                { current_courses.map((course, index) => 
                    <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                        <div className="flex h-full w-full">
                            <div className="flex h-full w-full">
                                <Image className="object-cover" src={course.cover_image} layout="fixed" width="200" height="230" alt={course.title} />
                            </div>
                            <div className="p-8">
                                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{course.course_type}</div>
                                <Link href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{course.title}</Link>
                                <p className="mt-2 text-gray-500">{course.description}</p>
                            </div>
                        </div>
                    </div>
                )}
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
        </>
    )
}
