'use strict';
var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

router.get('/add', function(req, res, next) {
    res.render('addcategory', {
      'title': 'Add Category'
    });
});

router.post('/add', function(req, res, next) {
    //Get the form values
    var name = req.body.name;

    var mongo = require('mongodb');
    var db = require('monk')('localhost/nodeblog');

    //Form Validation
    req.checkBody('name', 'Name field is required').notEmpty();

    //Check errors
    var errors = req.validationErrors();

    if(errors){
        res.render('addpost', {
            'errors': errors
            // 'title': title,
            // 'body': body
        });
    } else {
        var categories = db.get('categories');
        categories.insert({
            'name': name
        }, function(err, post){
            if(err){
                res.send(err);
            } else {
                req.flash('success', 'Category Added');
                res.location('/');
                res.redirect('/');
            }
        });
    }
});

module.exports = router;
