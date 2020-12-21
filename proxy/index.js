const http = require('http');
const url = require('url');

function onRequest(clientReq, clientRes) {
    const queryObject = url.parse(clientReq.url,true).query;
    const port = queryObject.port ? queryObject.port : 80;

    let body = "";
    clientReq.on("data", function (chunk) {
        body += chunk;
    });

    clientReq.on("end", function(){
        clientRes.writeHead(200, { "Content-Type": "text/html" });

        if (!queryObject.host || !queryObject.url) {
            clientRes.end(`Please specify host and url as the query parameters.`);

            return;
        }

        clientRes.end(`OK, will send request to ${queryObject.host}`);

        makeRequest(queryObject.host, queryObject.url, port, clientReq.method, clientReq.headers, body);
    });
}

function makeRequest(host, url, port, method, headers, content) {
    const options = {
        hostname: host,
        port: port,
        path: url,
        method: method,
        headers: headers
    };

    const proxyRequest = http.request(options, function (res) {
    });

    proxyRequest.on('error', function (e) {
        console.log("Proxy request error.");
        console.log(e);
    });

    proxyRequest.on('timeout', function () {
        console.log('Proxy request timeout.');
        proxyRequest.abort();
    });

    proxyRequest.write(content);
    proxyRequest.end();
}

http.createServer(onRequest).listen(8190);

console.log("Proxy server started, port 8190.");