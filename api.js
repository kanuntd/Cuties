var express =require('express');
var app = express();
var path = require('path');


var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://test123:test123@ds245532.mlab.com:45532/tests", function(err, db) {
        if (err) throw err;
        var dbo = db.db("tests");

        app.use(express.static(path.join(__dirname,'/')));

        app.get("/",function(req,res){
           console.log(req.url);
           res.status(200).sendFile(path.join(__dirname,'index.html'));
         });
          /*function เรียกใช้ค่า จาก index.html*/
        app.get('/showdata',function(req,res){

            /*รับค่าจาก index. html ไว้ใน data*/
            dataq={
               user:req.query.usernameup,
               password:req.query.passwordup,
               email:req.query.email
            };

            // register 
            var query = {user:req.query.usernameup};
            dbo.collection("User").find(dataq).count(function(err,result){
             if(err){
               throw err;
             }
             if(result===0){
               dbo.collection("User").insertOne(dataq, function(err, res) {
                  if (err) throw err;
                   console.log("Ok");
                  
                  });
              }else{
                 console.log(result);
                 console.log("not insert")

              }
            });
            res.end();
          });
        //
        app.get('/login',function(req,res){
        /*รับค่าจาก index. html ไว้ใน data*/
        dataq={
           user:req.query.user 
        };
         dbo.collection("User").find(dataq).count(function(err,result){
         if(err){
           throw err;
         }
          if(result===0){
                console.log(result);
               
               
         }else{
              
             
          }
        });

      });

    

});

app.listen(8000);
        