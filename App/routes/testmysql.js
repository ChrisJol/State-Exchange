var express = require('express');
var router = express.Router();
// const path = require('path');
var db = require("../db/index");

/* GET vertical prototype */
router.get('/testmysql', (req, res, next) => {
    db.getConnection( (err, connection) => {
        db.query('SELECT * FROM Posting', (error, results, fields) => {
            if(error){
                console.log(error);
            } else{
                res.send(results);
            }
        })
    })
});

module.exports = router;