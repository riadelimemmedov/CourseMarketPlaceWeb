
//!Custom components
import {CourseHero,CourseCurriculum,CourseKeypoints} from '@components/course'
import {Modal} from '@components/common'
import { BaseLayout } from '@components/layout'


//!Course
export default function Course() {
    return (
        <BaseLayout>
            <CourseHero/>
            <CourseKeypoints/>
            <CourseCurriculum/>
            <Modal/>
        </BaseLayout>
    )
}