//!React
import useSWR from "swr"

//?handler
export const handler = (web3,contract) => (courses,account) => {
    const swrRes = useSWR(()=>
        (web3 && contract && account.data) ? "web3/ownedCourses":null,
        async () => {
            const ownedCourses = []
            for(let i=0; i<courses.length; i++){
                const course = courses[i]

                console.log('Account  ', account)

                const hexCourseId = web3.utils.utf8ToHex(String(course.id))
                console.log("🚀 ~ file: useOwnedCourses.js:14 ~ hexCourseId:", hexCourseId)
                const courseHash = web3.utils.soliditySha3(
                    { type: "bytes16", value: Number(hexCourseId)},
                    { type: "address", value: account.data }
                ) 
                console.log("🚀 ~ file: useOwnedCourses.js:22 ~ courseHash:", courseHash)
                
                const ownedCourse = await contract.methods.getCourseByHash(courseHash).call()
                console.log("🚀 ~ file: useOwnedCourses.js:20 ~ ownedCourse:", ownedCourse)
                
                if(ownedCourse.owner != "0x0000000000000000000000000000000000000000"){
                    ownedCourses.push(ownedCourse)
                }

            }
            return ownedCourses
        }
    )
    return swrRes
}