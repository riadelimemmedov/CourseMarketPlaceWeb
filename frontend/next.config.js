/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
module.exports = {
    env: {
        api_root_endpoint: 'http://127.0.0.1:8000',
    },
    images:{
        domains:[
            "thrangra.sirv.com"
        ]
    }
}
