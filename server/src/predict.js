/**
 * FastText.js
 * @author Loreto Parisi (loretoparisi at gmail dot com)
 * @copyright Copyright (c) 2017-2019 Loreto Parisi
*/

"use strict";

(function () {

    const queryString = require('querystring'),
        FastText = require('fasttext.js'),
        http = require('http')

    const port = process.env.PORT || 8801
    const host = process.env.HOST || '0.0.0.0'

    // 这里需要改成真实路径
    const fastText = new FastText({
        loadModel: '../model/model.ftz'
    })


    const requestHandler = (request, response) => {
        let query = request.url.split('?')[1]
        let queryObj = queryString.parse(query)

        fastText.predict(queryObj.text)
            .then(labels => {
                let res = {
                    predict: labels
                }
                response.setHeader('Content-Type', 'application/json')
                response.end( JSON.stringify(res, null, 2) )
            })
            .catch(error => {
                console.error("predict error", error)
            })
    }

    const server = http.createServer(requestHandler)
    
    fastText.load()
    .then(done => {
        console.log("model loaded")
        server.listen(port, host, (error) => {
            if (error) {
                console.error(error)
            }
            console.log(`server is listening on ${port}`)
        })
    })
    .catch(error => {
        console.error("load error", error)
    });


}).call(this)