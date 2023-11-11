//!Course

"use client"

//!React
import { useEffect, useState } from "react"

//!Third party packages
import ReactPaginate from 'react-paginate';

//!Pagination classess
import '././../../../styles/pagination.css'

export default function List(){
    const [courses,setCourse] = useState([])

    useEffect(()=>{
        const getAllCourses = async () => {
          fetch(`${process.env.api_root_endpoint}/courses/`)
            .then((response) => response.json())
            .then((data) => {
              setCourse(data)
            })
        }
        getAllCourses()
    },[])


  return(
        <section className="grid grid-cols-2 gap-4 mb-5">
            { courses.map((course, index) => 
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                  <div className="md:flex">
                      <div className="md:flex-shrink-0">
                          <img className="h-48 w-full object-cover md:w-48" src={course.cover_image} alt="Man looking at item at a store" />
                      </div>
                      <div className="p-8">
                          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{course.course_type}</div>
                          <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{course.title}</a>
                          <p className="mt-2 text-gray-500">{course.description}</p>
                      </div>
                  </div>
              </div>
            )}


        </section>
    )
}
