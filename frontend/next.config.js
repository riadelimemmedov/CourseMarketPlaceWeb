/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
module.exports = {
    env: {
        api_root_endpoint: 'http://127.0.0.1:8000',
        api_root_endpoint_ethereum:"https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false",
    },
    images:{
        domains:[
            "thrangra.sirv.com",
            "raw.githubusercontent.com"
        ],
    }
}
