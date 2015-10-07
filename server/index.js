'use strict';

var http = require('http');

var server = http.createServer(function (request, response) {
    var json = jsonResponseBuilder(response);
    timer.times(10, 1000, json);
});
server.listen(1400, "127.0.0.1");
console.log('waiting for connections to 127.0.0.1:1400');

var timer = {
    _timesExecuted: 0,
    times: function(times, delay, callback) {
        var self = this;
        this.intervalId = setInterval(function() {
            console.log('_timesExecuted', self._timesExecuted);
            if(self._timesExecuted >= times) {
                self._timesExecuted = 0;
                self.cancel();
                callback(true);
                return;
            }

            callback();
            self._timesExecuted++;
        }, delay);

    },
    cancel: function() {
        clearInterval(this.intervalId);
    }
};

var jsonResponseBuilder = function (response) {
    response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    response.setHeader('Access-Control-Request-Method', 'GET');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Expose-Headers', 'Transfer-Encoding');

    response.setHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    response.setHeader('Transfer-Encoding', 'chunked');

    return function (end) {
        if(end) {
            response.end();
            return;
        }
        var json = {
            id: Math.random().toString().substring(2),
            title: Math.random().toString(36).substring(2)
        };
        response.write(JSON.stringify(json) + '\n\n');
    };
};

