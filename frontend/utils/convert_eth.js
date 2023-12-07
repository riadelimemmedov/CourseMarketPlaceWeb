
//convert
const convert = (eth,course) => {
    return eth.data ? (course.price / eth.data).toFixed(5) : 'Loading'
    
}
export default convert