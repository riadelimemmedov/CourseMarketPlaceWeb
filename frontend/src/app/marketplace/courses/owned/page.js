"use client"

//!React and Next.js
import { useEffect, useState } from "react"

//!Custom components
import { BaseLayout } from "@components/ui/layout"
import { Header } from "@components/ui/marketplace"
import { OwnedCourseCard } from "@components/ui/course"
import { Button, Message } from "@components/ui/common"

//!Helpers methods
import { useOwnedCourses } from "@components/hooks/web3/useOwnedCourses"
import { useAccount } from "@components/hooks/web3/useAccount"



//*OwnedCourses
export default function OwnedCourses () {
        const { account } = useAccount()
        const [courses,setCourse] = useState([])

        //getAllCourses
        const get_all_courses = async () => {
            fetch(`${process.env.api_root_endpoint}/courses/`)
                .then((response) => response.json())
                .then((data) => {
                    setCourse(data)
            })
        }

        const ownedCourses = useOwnedCourses(courses,account)
        console.log('Buying coursesss....... ', ownedCourses.data)


        useEffect(() => {
            get_all_courses()
        },[])

        //return jsx to client
        return (
            <>
                <BaseLayout>
                    <div className="py-4">
                        <Header/>
                    </div>
                    <section className="grid grid-cols-1">
                        <OwnedCourseCard/>
                        <Message type="warning">
                            My custom messages!
                        </Message>
                        <Button>
                            Watch the course
                        </Button>
                    </section>
                </BaseLayout>
            </>
        )
}