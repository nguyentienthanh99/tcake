var express = require('express');
var database = require('./database');
var app = express();

app.get('/listLoaiBanh',function(req,res){
    database.getAllLoaiBanh(function(resultQuery){
        res.json(resultQuery);
    })
});
app.listen(3000);