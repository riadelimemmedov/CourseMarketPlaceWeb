"use client"

//!Custom components
import { BaseLayout } from "@components/ui/layout"
import { Header } from "@components/ui/marketplace"
import { OwnedCourseCard } from "@components/ui/course"


//*ManageCourses
export default function ManageCourses () {
        //return jsx to client
        return (
            <>
                <BaseLayout>
                    <Header/>
                    <section className="grid grid-cols-1">
                        <OwnedCourseCard/>
                    </section>
                </BaseLayout>
            </>
        )
}