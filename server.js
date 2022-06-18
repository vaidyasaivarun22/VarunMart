const exp = require('express')
const app = exp()
const path = require('path');
require('dotenv').config();

// Joining the fromntend(angular) and backend(server)
app.use(exp.static(path.join(__dirname,'./dist/news-app/')))

// import Apis
const userApi = require('./APIS/user-api.js');
const productApi = require('./APIS/products-api.js');

// importing Mongoclient
const mc = require("mongodb").MongoClient; 

// Data base connection string 
const databaseUrl = process.env.DATABASE_URL;

//connect to DB
mc.connect(databaseUrl,(err,client)=>{
    if(err)
    {
        console.log("err in db connection",err);
    }
    else{
        databaseObj = client.db("testdb2022");
        // creating a user collection object
        let userCollectionObj = databaseObj.collection("usercollection");
        let productsCollectionObj = databaseObj.collection("productscollection");
        let iphoneCollectionObj = databaseObj.collection("iphonecollection");
        let samsungCollectionObj = databaseObj.collection("samsungcollection");
        let xiaomiCollectionObj = databaseObj.collection("xiaomicollection");
        let userCartCollectionObject = databaseObj.collection("usercartcollection");

        app.set("userCollectionObj",userCollectionObj);
        app.set("productsCollectionObj",productsCollectionObj);
        app.set("iphoneCollectionObj",iphoneCollectionObj);
        app.set("samsungCollectionObj",samsungCollectionObj);
        app.set("xiaomiCollectionObj",xiaomiCollectionObj);
        app.set("userCartCollectionObject",userCartCollectionObject);
        console.log("connected to database :)");
    }
})


// Execute specific api based on path
app.use('/users',userApi); 
app.use('/products',productApi);


// invalid-path
app.use((req,res,next)=>{
    console.log("path doesn't exist",`${req.url}`);
    res.send({message:`path ${req.url} does not exist`})
})

// error handling middleware...
app.use((err,req,res,next)=>{
    // console.log("Some error occred",err);
    if(err.message.startsWith("Third argument to $slice must be positive"))
    {
    res.send({message:`Double Pressed an item to cart.Product Removed Successfully.`});
    }
    else
        res.send({message:`Error Occured is ${err.message}`});
})


const port=process.env.PORT||8080 ;
app.listen(port,()=>{console.log(`server started on port ${port}`)});