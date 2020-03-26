const http = require('http');
const express = require('express');
const request = require('request');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const userRoute = require('./app/route');
const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/',userRoute);

console.log('Hello Ved Prakash');
app.get('/check', (req, res)=>{
    res.send('Route is Working');
});

app.get('/download/file12', (req, res)=>{
    console.log('Inside the download file');
    var download = function(uri, filename, callback){
        request.head(uri, function(err, res, body){
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };


    download('https://scontent-bom1-2.cdninstagram.com/vp/86f3dd3766980260eb62a85b4827c699/5DCB77C6/t50.2886-16/77102661_163675711400946_5239810756063877831_n.mp4?_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_cat=106', 'profile_ph.mp4', function(){
        console.log('done');
    });
});

const server = app.listen(3250, ()=>{
    console.log('App started on the port:: ', 3250);
});
