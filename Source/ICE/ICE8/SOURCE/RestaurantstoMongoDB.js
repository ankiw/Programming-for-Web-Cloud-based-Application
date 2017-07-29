/**
 * Created by Vijaya Yeruva on 5/27/2017.
 */

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://user:omsairam@ds139480.mlab.com:39480/asedemo';// change it with your db credentials

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var myobj = [
        {Id: '4af31b30f964a520b3ea21e3', Name: 'ASE_Lab_Assignment'},
        {Id: '4b019e70f964a520ff4322e3', Name: 'Hackathon-SmartDocumentCreatorManager'},
        {Id: '4b944769f964a520a37234e3', Name: 'Python-Programming'},
        {Id: '4bbcc68fa0a0c9b696c61a0f', Name: 'RemoteRepository'},
        {Id: '55008ea0498ef17172c53198', Name: 'Web-Cloud-based-programming'}
    ];
    db.collection("git").insertMany(myobj, function (err, res) {
        if (err) throw err;
        db.close();
    });
});

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    db.collection("git").find({}).toArray(function (err, result) {
        if (err) throw err;
        db.close();
        var fs = require('fs');
        var data = []
        for (i = 0; i < 10; i++) {
            var obj = {
                name: result[i].Name,
                id: result[i].Id

            }
            data.push(obj)
        }
        var newdata = [{
            "name": "Esha Mayuri",
            "parent": "US",
            "children": data
        }
        ]
        fs.writeFile("Restaurants.json", JSON.stringify(newdata), function (err) {
                if (err) throw err;
            }
        );
    });
});