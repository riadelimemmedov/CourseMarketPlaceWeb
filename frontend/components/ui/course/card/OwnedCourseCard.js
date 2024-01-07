
//!React and Next
import Image from "next/legacy/image"
import Link from 'next/link'

//!Pagination classess
import '../../../../styles/pagination.css'


//*OwnedCourseCard
export default function OwnedCourseCard({children, course}) {
    const STATE_COLORS_TEXT = {
        purchased: "#4338ca",
        activated: "#15803d",
        deactivated: "#b91c1c"
    }

    const STATE_COLORS_BACKGROUND = {
        purchased: "#c7d2fe",
        activated: "#bbf7d0",
        deactivated: "#fecaca"
    }
    
    const stateTextColor = STATE_COLORS_TEXT[course.state]
    const stateBackColor = STATE_COLORS_BACKGROUND[course.state]

    //return jsx to client
    return (
        <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
            <div className="block sm:flex">
                <div className="flex-1">
                    <div className="h-72 sm:h-full next-image-wrapper">
                        <Link href={`/course/${course.slug}`}>
                            <Image
                                className="object-cover"
                                src={course.cover_image}
                                width="58"
                                height="80"
                                layout="responsive"
                            />
                        </Link>
                    </div>
                </div>
                <div className="flex-4">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            <span className="mr-2">{course.title}</span>
                            <span className={`text-xs rounded-full p-2`} style={{color: stateTextColor,background:stateBackColor}}>
                                {course.state}
                            </span>
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        {course.price} ETH
                        </p>
                    </div>
        
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Course ID
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {   course.id}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Proof
                                </dt>
                                <dd className="break-words mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {course.proof}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:px-6">
                                {children}
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}