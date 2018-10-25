var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser')
var router = express.Router();

var customers = [];
var MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/')));

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

app.post("/api/customers/login", function (req, res) {
  console.log('Post a Customer: ' + req.body.user);
  var customer = {};
  customer.username = req.body.user;
  customer.password = req.body.pass;

  customers.push(customer);


   MongoClient.connect('mongodb://test123:test123@ds245532.mlab.com:45532/tests', function (err, database) {
    if (err)
       throw err
    console.log('Connected to MongoDB')
    var dbo = database.db("tests");

    dbo.collection("User").find(customer).count(function(err,result){

          if(result===0){
            
            return res.send('false');
            
           }else{
             console.log(result);
             return res.send('true');
           }
         });
   });


  
  
});

app.post("/api/customers/register", function (req, res) {
  console.log('Post a Customer: ' + req.body.user + " " + req.body.pass );
  var customer = {};
  customer.username = req.body.user;
  customer.password = req.body.pass;
  customer.email = req.body.email;

  customers.push(customer);


   MongoClient.connect('mongodb://test123:test123@ds245532.mlab.com:45532/tests', function (err, database) {
    if (err)
       throw err
    console.log('Connected to MongoDB')
    var dbo = database.db("tests");
    dbo.collection("User").find(customer).count(function(err,result){
          if(result===0){
            
            dbo.collection("User").insert(customer, function (err, result) {
                  if (err){

                  }
                  
                  else
                   console.log("ok");
                   return  res.send("true")  
              
                  });
 
           }else{
             console.log(result);
             return res.send('false');
           }
         });
   });


  
  
});



app.listen(8000, () => {
    console.log("Successs")

});

// MongoClient.connect('mongodb://test123:test123@ds245532.mlab.com:45532/tests', function (err, database) {
//   if (err)
//     throw err
//   else {

//     console.log('Connected to MongoDB')
//     app.listen(8000);
//   }
//   var dbo = database.db("tests"); 
//   app.use(bodyParser.json())

// app.post('/', function (req, res) {
//       console.log(req.body)
//       dbo.collection("User").insert(req.body, function (err, result) {
//     if (err)
//         res.send('Error');
//        else
//       res.send("Success")
//        console.log("ok");

//     });
// });
// app.get('/login',function(req,res){

//   /*รับค่าจาก index. html ไว้ใน data*/
//   dataq={
//      username:req.query.user
//   };
//   console.log(dataq)
//   dbo.collection("User").find(dataq).count(function(err,result){

//     if(result===0){
//           console.log("NO")
//           database.close();
//           res.redirect('index.html') 
//      }else{
//         res.redirect('user.html?'+req.query.user) 
//         database.close();
//      }
//    });

// });


//  app.get('/aboutus', (req, res) => {

//      console.log(req.body)

//      dbo.collection("message").insertOne(req.body, function (err, result) {
//          if (err) throw err;
//            res.redirect('aboutus.html')
//          database.close();
//       });
//      });
// });






