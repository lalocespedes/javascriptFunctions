var Hapi = require('hapi');
var server = new Hapi.Server();
var dummyAPI = require('hapi-dummy-api');

server.connection({
    port: 3000,
    routes: {
        cors: {
            additionalHeaders: ['Access-Control-Allow-Origin']
        }
    }
});

server.register(
    // register the plugin twice with both of our configs
    [
        {
            register: dummyAPI,
            options: require('./options/superheroes')
        },
        {
            register: dummyAPI,
            options: require('./options/people')
        },
                {
            register: dummyAPI,
            options: require('./options/taxes')
        }
    ],
    function (err) {
        if (err) throw err;
        server.start(function (err) {
            if (err) throw err;
            console.log("running at: ", server.info.uri);
        });
    }
);