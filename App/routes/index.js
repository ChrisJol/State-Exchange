var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/index', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;