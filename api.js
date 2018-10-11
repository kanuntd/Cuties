var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser')



var MongoClient = require('mongodb').MongoClient;
app.use(express.static(path.join(__dirname, '/')));
MongoClient.connect('mongodb://test123:test123@ds245532.mlab.com:45532/tests', function (err, database) {
  if (err)
    throw err
  else {

    console.log('Connected to MongoDB')
    app.listen(8000);
  }
  var dbo = database.db("tests"); 
  app.use(bodyParser.json())

app.post('/', function (req, res) {
      console.log(req.body)
      dbo.collection("User").insert(req.body, function (err, result) {
    if (err)
        res.send('Error');
       else
      res.send("Success")
       console.log("ok");

    });
});
app.get('/login',function(req,res){
        
  /*รับค่าจาก index. html ไว้ใน data*/
  dataq={
     username:req.query.user
  };
  console.log(dataq)
  dbo.collection("User").find(dataq).count(function(err,result){

    if(result===0){
          console.log("NO")
          database.close();
          res.redirect('index.html') 
     }else{
        res.redirect('user.html?'+req.query.user) 
        database.close();
     }
   });
 
});


 app.get('/aboutus', (req, res) => {
   
     console.log(req.body)
       
     dbo.collection("message").insertOne(req.body, function (err, result) {
         if (err) throw err;
           res.redirect('aboutus.html')
         database.close();
      });
     });
});






