const express = require('express');
const routes = require('../router/api');
const body = require('body-parser');

const app =express(); //set up express app

app.use('/api',require('../router/api'));
app.use(body.json());


app.listen(process.env.port ||4000,function(){
     console.log('now listening')
});
