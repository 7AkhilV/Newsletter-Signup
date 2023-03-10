const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https')

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req,res){
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

    const data ={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname,
                }

            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/dd55943025";

    const options ={
        method:"POST",
        auth:"Akhil:1f2b32383946f2808a339b18dbdbd217-us10"
    }


    const request = https.request(url,options,function(response){
        if (response.statusCode===200){
            res.sendFile(__dirname + "/succes.html")
        }else{
            res.sendFile(__dirname +  "/failure.html")
        }
        
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();

    
})

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000")
})

//API KEY 
//1f2b32383946f2808a339b18dbdbd217-us10

//LIST ID
//dd55943025