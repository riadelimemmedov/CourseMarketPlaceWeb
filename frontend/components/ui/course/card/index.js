
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


//*Card
export default function Card({course,index,Footer}){
    const pathname = usePathname()

    //return jsx to client
    return(
        <div>
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="flex h-full w-full">
                    <div className="flex-1 h-full w-full">
                        <Link href={`/course/${course.slug}`}>
                            <Image className="object-cover" src={course.cover_image} layout="responsive" width="200" height="260" alt={course.title} />
                        </Link>
                    </div>
                    <div className="p-8 flex-1">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{course.course_type}</div>
                        <Link href={`/course/${course.slug}`} className="block mt-1 text-lg leading-tight font-mediu">{course.title}</Link>
                        <p className="mt-2 text-gray-500">{course.description.substring(0,70)}...</p>
                        {Footer && pathname.includes('/marketplace') &&
                            <Footer/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}