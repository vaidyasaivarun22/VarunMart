//create an mini express app
const exp = require('express');
const userApi = exp.Router();
const ExpressErrorHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage }=require('multer-storage-cloudinary');
const { async } = require('rxjs');
const expressAsyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
require('dotenv').config();

// configure cloudinary
cloudinary.config({
    cloud_name:'dbje2z9ua',
    api_key:'138278656642587',
    api_secret:'gmYR90AF7z4WvuurDukGmgDQs88'
})
// configure multer-storage-cloudinary
const cldStorage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
        return{
            folder:"cloudinaryFiles",
            public_id:file.filename+'-'+Date.now()
        }
    }
})
// configure multer
const multerObj = new multer({
    storage:cldStorage
})

// -------------------------------------------------------------------------------------------------------------
let count=0;
// Creating a parser for converson to json content
userApi.use(exp.json());

// get all the users using async-await method
userApi.get('/getusers',ExpressErrorHandler(async(req,res)=>{

    let userCollectionObj = req.app.get("userCollectionObj");
    let userList = await userCollectionObj.find().toArray();
    res.send({massage:userList});

}))

// get specific user with a username using async-await method
userApi.get('/getuser/:username',ExpressErrorHandler(async(req,res)=>{

    let userCollectionObj = req.app.get("userCollectionObj");
    let un = req.params.username;
    let userObj = await userCollectionObj.findOne({username:un});
    if(userObj === null)
    {
        res.send({message:`user with name ${un} doesn't exist in database`});
    }
    else{
        res.send({massage:userObj});
    }
}))

// Create a user using async-await method and adding the multer middleware to it
userApi.post('/createuser',multerObj.single('photo'),ExpressErrorHandler(async(req,res)=>{
    
    let userCollectionObj = req.app.get("userCollectionObj");
    let newUser = JSON.parse(req.body.userRegisterObj);
    console.log(newUser);
    let userExistObj = await userCollectionObj.findOne({username:newUser.username})
    if(userExistObj === null)
    {
        let hashedPassword =await bcryptjs.hash(newUser.password,7);
        // Replace the hashed password
        newUser.password = hashedPassword;
        // add image url to the user Object
        newUser.profileImage = req.file.path;
        delete newUser.photo;
        await userCollectionObj.insertOne(newUser);
        res.send({message:'User created Successfully!!!'});
    }
    else
    {
        res.send({message:`Username Already Exists.Try with other user name`});
    }
}))

// Update an user data using async-await method
userApi.put('/updateuser/:username',ExpressErrorHandler(async(req,res)=>{

    let userCollectionObj = req.app.get("userCollectionObj");
    let un = req.params.username;
    let updatedUserObj = req.body;
    let userObj = await userCollectionObj.findOne({username:un});

    if(userObj===null)
    {
        res.send({message:`User with name ${un} Doesn't Exists. Try with other user name`});
    }
    else
    {
        let hashedPassword =await bcryptjs.hash(updatedUserObj.password,7);
        // Replace the hashed password
        updatedUserObj.password = hashedPassword;
        await userCollectionObj.updateOne({username:un},{$set:{...updatedUserObj}});
        res.send({message:`User with name ${un} Updated Successfully!!!`})
    }
}))

// Deleting an user data using username, async-await method
userApi.delete('/deleteuser/:username',ExpressErrorHandler(async(req,res)=>{

    let userCollectionObj = req.app.get("userCollectionObj");
    let un = req.params.username;
    let userObj = await userCollectionObj.findOne({username:un});
    if(userObj===null)
    {
        res.send({message:`User with name ${un} Doesn't Exists. Try with other user name`});
    }
    else
    {
        await userCollectionObj.deleteOne({username:un});
        res.send({message:`deleted user with user name ${un} successfully!!!`});
    }
}))

// -------------------------------------------------------------------------------------------------------

// Login validation using async-await method
userApi.post('/login',ExpressErrorHandler(async(req,res)=>{

    let userCollectionObj = req.app.get("userCollectionObj");
    loginObj = req.body;
    let autObj = await userCollectionObj.findOne({username:loginObj.username});
    if(autObj === null)
    {
        res.send({message:`Seems to be a new user or else Invalid username, ${loginObj.username} doesn't exist.try again after registration !!!)`});
    }
    else
    {
       let flag = await bcryptjs.compare(loginObj.password,autObj.password);
       if(flag === false)
       {
            res.send({message:`Invalid password try with correct credentials...`});
       }
       else
       {
            let signedToken = await jwt.sign({username:autObj.username},'secret',{expiresIn: "2h"});
            res.send({message:`Login successfull !!!`,token:signedToken,username:autObj.username,userObj:autObj});
       }
    }
}))
// ----------------------------------------------------------------------------------------
userApi.post('/add-to-cart',ExpressErrorHandler(async(req,res,next)=>{
    
    let userCartCollectionObject = req.app.get("userCartCollectionObject");
    let newProductObject = req.body;
    
    // find usercartcollection
    let userCartObject = await userCartCollectionObject.findOne({username:newProductObject.username});

    // if userCartObj is not There at all
    if(userCartObject === null)
    {
        // create new Object to store
        let products = [];
        products.push(newProductObject.productObj);

        let newUserCartObject = {username:newProductObject.username,products}
        await userCartCollectionObject.insertOne(newUserCartObject);
        // sending latest cartObjects
        let latestCartObject = await userCartCollectionObject.findOne({username:newProductObject.username});
        res.send({message:"New product Added",latestCartObject:latestCartObject});
    }
    else
    {
        // push productsObject to products array 
        userCartObject.products.push(newProductObject.productObj);
        // Update document
        await userCartCollectionObject.updateOne({username:newProductObject.username},{$set:{...userCartObject}});
        // sending latest cartObjects
        let latestCartObject = await userCartCollectionObject.findOne({username:newProductObject.username});
        res.send({message:"New product Added",latestCartObject:latestCartObject});
    }
}))

// Getting all the products of the cart of a specific user
userApi.get('/getproducts/:username',ExpressErrorHandler(async(req,res,next)=>{

    let userCartCollectionObject = req.app.get("userCartCollectionObject");
    let un = req.params.username;

    let userProdObj = await userCartCollectionObject.findOne({username:un});
    if(userProdObj === null)
    {
        res.send({message:"Cart-Empty :("});
    }
    else
    {
        res.send({message:userProdObj});
        this.count=userProdObj.products.length;
    }
}))

userApi.put('/deleteproduct/:productid/',ExpressErrorHandler(async(req,res)=>{
    let userCartCollectionObject = req.app.get("userCartCollectionObject");
    // console.log(req.body.username);
    let userCartObj = req.body;
    let pid = req.params.productid;
    // console.log(userCartObj,pid);
    let userExist = await userCartCollectionObject.findOne({username:userCartObj.username});
    if(userExist !==  null)
    {
       await userCartCollectionObject.updateOne({username:userCartObj.username},{$pull:{products:{"_id":pid}}});
       // sending latest cartObjects
       let latestCartObject = await userCartCollectionObject.findOne({username:userCartObj.username});
       res.send({message:"Product Removed successfully",latestCartObject:latestCartObject});
    }
    else
    {
        res.send({message:"user doesn't exists..."});
    }
}))

// Empty users cart on checkout
userApi.put('/empty-cart/:username',ExpressErrorHandler(async(req,res)=>{
    let userCartCollectionObject = req.app.get("userCartCollectionObject");
    let un = req.params.username;
    let userExist = await userCartCollectionObject.findOne({username:un});
    if(userExist !== null)
    {
        await userCartCollectionObject.updateOne({username:un},{$set:{products:[]}});
        res.send("checkout successfull !!!");
    }
    else
    {
        res.send({message:"user doesn't exists..."});
    }
}))

// ------------------------------------------------------
// sending mail to the user after successfull checkout 
userApi.post('/send-mail/:useremail',ExpressErrorHandler(async(req,res)=>{

    let userObj = req.body;
    let usermail = req.params.useremail;


    const transporter = nodemailer.createTransport({
        service:"hotmail",
        auth:{
            user:process.env.MAIL_SENDER,
            pass:process.env.VARUNMARTPASSWORD
        }
    });

    const options ={
        from:process.env.MAIL_SENDER,
        to:`${usermail},"${process.env.MYMAIL}"`,
        subject:"Regarding Recent Purchases confirmation at VarunMart",
        html:`<span>Hey </span><span style="color:blue">${userObj.name},</span><br><br>We are so thankful to you for making ${this.count} purchase/purchases of total cost of &#8377; ${userObj.cost} at VarunMart...Hoping our services are really helpfull to you and making your life easier :) <br><br>&nbsp;&nbsp;-Thankyou...visit Again!!! <br><br><h3 style="text-align:right;color:blue">@VarunMart</h3>`
    };

    transporter.sendMail(options,function(err,info){
        if(err)
        {
            res.send({message:"some error occured"});
        }
        else{
            res.send({message:info.response});
        }
    })

}))


module.exports=userApi;