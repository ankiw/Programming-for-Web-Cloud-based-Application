var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var url = 'mongodb://ankita:1234@ds123381.mlab.com:23381/mydatabase';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/insert', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
})
app.get('/get', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        console.log(app.get('config'));
        assert.equal(null, err);
        db.collection('users').find().toArray(function(err, result) {
            if (err) {
                res.write("get Failed");
                res.end();
            } else {

                res.send(JSON.stringify(result));
            }
            console.log("Got All Documents " + JSON.stringify(result));
        });
    });
});

app.post('/update', function (req, res) {
    var item = {
        "fname": req.body.fname,
        "lname": req.body.lname,
        "email": req.body.email,
        "password": req.body.password
    }
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var id = req.body._id;
        db.collection('users').updateOne({"_id": objectId(id)},{'$set':item}, {
                upsert: true
            },
            function(err,result){
                if(err)
                    throw err;
                else
                    res.send("Update success !");
            });
    });
});

app.post('/delete', function (req, res) {
    var id = req.body._id;
    console.log(id);
    MongoClient.connect(url, function(err, db) {
        console.log("after connect");
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        console.log(id);
        db.collection('users').deleteOne({"_id": objectId(id)}, {
                upsert: true
            },
            function(err,result){
                if(err)
                    throw err;
                else
                    res.send("Update success !");
            });
    });
});
var insertDocument = function(db, data, callback) {
    db.collection('users').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the restaurants collection.");
        callback();
    });
};
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
})