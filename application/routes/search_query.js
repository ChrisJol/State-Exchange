var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
var db = require("../db/connection");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false}));

/*Simple parameter mysql query fetch.*/
/*Able to only grab from Posting via ID only.*/
router.post('/search_query', (req, res, next) => {
    
    console.log("category: ", req.body.category);
    console.log("query: ", req.body.query);

    var queryString = ""

    if(req.body.category == 'All'){
        queryString = `SELECT * FROM Posting WHERE Name LIKE '%${req.body.query}%'`;
    }
    else{
        queryString = `SELECT * FROM Posting WHERE Name LIKE '%${req.body.query}%' AND Category LIKE '%${req.body.category}%'`;
    }

    console.log(queryString)
    db.connect(function(err) {
        db.query(queryString, (err, rows, fields) => {
            if (err){
                console.log("Failed: " + err);
                res.end();
                return;
            }
        
            console.log('Found database fetch');
            res.send(rows);

        })
    })
    
});

module.exports = router;
