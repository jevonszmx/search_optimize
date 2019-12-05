"use strict";

(function () {
    const queryString = require('querystring'),
         http = require('http'),
         nodejieba = require("nodejieba")

    const port = process.env.PORT || 8800
    const host = process.env.HOST || '0.0.0.0'

    const requestHandler = (request, response) => {
        let query = request.url.split('?')[1]
        let queryObj = queryString.parse(query)
        let result = nodejieba.cut(queryObj.text, true)
        let res = {
            rs: result
        }
        response.setHeader('Content-Type', 'application/json')
        response.end( JSON.stringify(res, null, 2) )
    }

    const server = http.createServer(requestHandler);
    server.listen(port, host, (error) => {
        if (error) {
            console.error(error);
        }
        console.log(`server is listening on ${port}`)
    })
}).call(this)