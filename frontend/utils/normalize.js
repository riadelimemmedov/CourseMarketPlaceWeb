//?COURSE_STATES
const COURSE_STATES = {
    0: "purchased",
    1: "activated",
    2: "deactivated",
}


//?normalizeOwnedCourse
export const normalizeOwnedCourse = web3 => (course,ownedCourse) => {
    return {
        ...course,
        proof:ownedCourse.proof,
        owned:ownedCourse.owner,
        price:web3.utils.fromWei(Number(ownedCourse.price),'ether'),
        state:COURSE_STATES[ownedCourse.state]
    }
}