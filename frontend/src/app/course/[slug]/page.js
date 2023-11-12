"use client"
//!Custom components
import {CourseHero,CourseCurriculum,CourseKeypoints} from '@components/course'
import {Modal} from '@components/common'
import { BaseLayout } from '@components/layout'


//!React and Next js
import { useRouter } from 'next/navigation'
import { useState,useEffect } from 'react'


//*Course
export default function Course({params}) {
    //state
    const [course,setCourse] = useState([])

    //get_course
    const get_course = async () => {
        fetch(`${process.env.api_root_endpoint}/courses/${params.slug}`)
            .then((response) => response.json())
            .then((data) => {
                setCourse(data)
        })
    }

    //useEffect
    useEffect(() => {
        get_course()
    },[])


    return (
        <BaseLayout>
            <div className="py-4">
                <CourseHero title={course.title} description={course.description} cover_image={course.cover_image}/>
            </div>
            <CourseKeypoints/>
            <CourseCurriculum/>
            <Modal/>
        </BaseLayout>
    )
}