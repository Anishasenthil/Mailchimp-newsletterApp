const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");


const app =express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));//inorder for our website (at server) to have css and image applied we use express
// method "static" and give a name "public" AND create a folder named "public" inside which we put our css and image.

app.get("/",function(req,res){
   res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
  const firstname = req.body.FirstName;
  const lastname= req.body.lastName;
  const email=req.body.email;

  const data ={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname
        }

      }
    ]
  };

 const jsondata=JSON.stringify(data);

const url="https://us8.api.mailchimp.com/3.0/lists/8a840bcb93";

const options={
  method:"POST",
  auth:"anisha:0372d5be447b96a2a759160c723e314f-us8"
}


 const request=https.request(url,options,function(response){

   //statuscode
   if(response.statusCode === 200){
     res.sendFile(__dirname+"/success.html");
   }
   else{
     res.sendFile(__dirname+"/failure.html");
   }

   response.on("data",function(data){//here data will be in hexa decimals parse it
      console.log(JSON.parse(data));
   })
 })

request.write(jsondata);
request.end();



});

app.post("/failure",function(req,res){
  res.redirect("/");
})


app.listen( "3000" ,function(req,res){
  console.log("port is running");
})


//id =4186e5e430.
//api key =0372d5be447b96a2a759160c723e314f-us8
