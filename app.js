var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var shorterRouter = require('./routes/shorterRouter')
var app = express();
const PORT = process.env.PORT || 5000

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/',shorterRouter)

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT} running...`)
})
