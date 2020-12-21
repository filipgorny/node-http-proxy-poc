# Node HTTP proxy POC

This is the POC of using nodejs event loop, to create an async http proxy.

## Usage

### 1. Start the example target server.

With PHP executable installed on the machine, go to the `target-server` folder, and execute:

`php -S 127.0.0.1:8010`

It will launch the built in PHP web server.


### 2. Start the javascript proxy server

With NODEJS installed on the machine, in the proxy folder, execute `node index.js`.

### 3. Make example request

With Postman, hit the `localhost:8190?host=localhost&url=/&port=8010` with `POST` method and test payload.

Proxy will respond immediately, without waiting for proxied request to finish.

### 4. Open the log file

In the target server's `taget-server/logs` directory, a new file should appear **after 5 seconds** with the payload content.