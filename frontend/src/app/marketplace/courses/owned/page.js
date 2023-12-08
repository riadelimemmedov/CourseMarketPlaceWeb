"use client"

//!Custom components
import { BaseLayout } from "@components/ui/layout"
import { Header } from "@components/ui/marketplace"
import { OwnedCourseCard } from "@components/ui/course"
import { Button, Message } from "@components/ui/common"



//*OwnedCourses
export default function OwnedCourses () {
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