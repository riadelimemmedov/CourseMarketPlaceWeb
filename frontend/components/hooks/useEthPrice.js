

//!Third party libraries
import useSWR from "swr";

const URL = `${process.env.api_root_endpoint_ethereum}`


//?fetcher
const fetcher = async url => {
    const res = await fetch(url);
    const json = await res.json();
    return json.market_data.current_price.usd ?? null
}


//?useEthPrice
export const useEthPrice = (course_price=null) => {
    const {data,...rest} = useSWR(
        URL,
        fetcher,
        {refreshInterval:10000 }
    )
    console.log('Ethreum price... ', data)
    return {eth:{data,...rest}}
}