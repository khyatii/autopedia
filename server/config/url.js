
const env = process.env.NODE_ENV;

if (env == 'production') {
    console.log('env', env)
    var constants = {
        dbUrl: "mongodb://mecanicus:mecanicus123@ds123196.mlab.com:23196/mecanicus",
        serverUrl: "http://13.234.138.103:4000",
        clientUrl: "http://ec2-13-234-138-103.ap-south-1.compute.amazonaws.com"
    }
}

if (env == 'development') {
    console.log('env', env)
    var constants = {
        dbUrl: "mongodb://mecanicus:mecanicus123@ds123196.mlab.com:23196/mecanicus",
        serverUrl: "http://localhost:4000",
        clientUrl: "http://localhost:3000"
    }
}

module.exports = constants;
