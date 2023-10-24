/** @type {import('next').NextConfig} */
const nextConfig = {
	env:{
		MONGODB_URI:"mongodb+srv://mukesh:12345@cluster0.hej3agm.mongodb.net/hirechain?retryWrites=true&w=majority"
	},
  reactStrictMode: true,
}

module.exports = nextConfig
