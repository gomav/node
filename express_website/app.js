'use strict';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.get('/', function(req, res){
    //Message will only be viewed in the console
    console.log('Hello Man!');
    //If you are trying to send it to the client
    res.render('index',{title: 'Welcome to PC Salvation!'});
});

app.get('/about', function(req, res){
    //Message will only be viewed in the console
    console.log('Hello Man-About!');
    //If you are trying to send it to the client
    res.render('about');
});
app.get('/contact', function(req, res){
    //Message will only be viewed in the console
    console.log('Hey! It\'s the contact page');
    //If you are trying to send it to the client
    res.render('contact');
});

app.post('/contact/send', function(req, res){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'manny.navarro@gmail.com',
            pass: ''
        }
    });


    var mailOptions = {
        from: 'The Tech Guy <manny.navarro@gmail.com',
        to: 'manny@emaginas.com',
        subject: 'Website Submission',
        text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
        html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.redirect('/');
        } else {
            console.log('Message Sent: '+info.response);
            res.redirect('/');
        }
    });
});
app.listen(2600);
console.log('Server is running on port 2600...');
