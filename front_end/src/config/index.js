
let server = "http://localhost:5000";
// const all = {
//    limit : 5
// };


const env = {
    development : {
        api : server,
    },
    staging : {
        api:server,
    },
    production: {
        api : server,
    }
};

env.development = {api : server}

export default {
    // ...all,
    ...env[process.env.NODE_ENV],
};