'use strict';
const express = require('express');
const request = require('request');
const fs = require('fs');
const app = express.Router();

app.use(function (req, res, next) {
    // .. some logic here .. like any other middleware
    console.log('Inside this some middleware logic', req.body);
    next();
});

var download = function(uri, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
        var filename = 'download_'+Date.now();
        if(res.headers['content-type'] == 'video/mp4'){
            filename += ".mp4"
        } else if(res.headers['content-type'] == 'image/jpeg'){
            filename += ".jpeg"
        } else if(res.headers['content-type'] == 'text/html; charset=utf-8'){
            filename += ".html"
        }
        console.log('Filename :: ', filename);
        try{
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        } catch (e) {
            console.log(e);
        }

    });
};

app.get('/checking', (req, res)=>{
    console.log('Nice to work on this.');
    res.status(200).json({
        statusCode: 200,
        status: "success",
        msg: 'Hello'
    });
});

app.post('/download/file', (req, res)=>{
    console.log('Inside the downloading the File', req.body);
    download(req.body.url, ()=>{
        res.send({
            status: 'success',
            statusCode: 200,
            msg: "File downloaded successfully."
        })
    })

});

module.exports = app;
// app.post('/download/file');