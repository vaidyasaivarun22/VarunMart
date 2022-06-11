//create an mini express app
const exp = require('express');
const productApi = exp.Router();
const expressErrorHandler = require('express-async-handler');
const { ObjectId } = require('mongodb');

productApi.use(exp.json());
// For Iphones
// 1.Adding new Iphone
productApi.post('/add-iphone',expressErrorHandler(async(req,res,next)=>{
    let iphoneCollectionObj = req.app.get("iphoneCollectionObj");
    let newIphone = req.body;
    let iphoneObject = await iphoneCollectionObj.findOne({productTitle:newIphone.productTitle});
    // if product already existed
    if(iphoneObject !== null)
    {
        res.send({message:"product already existed"});
    }
    else
    {
        await iphoneCollectionObj.insertOne(newIphone);
        res.send({message:"New iphone added to collection"});
    }
}))
// 2.Read all Iphones Data
productApi.get('/get-iphones',expressErrorHandler(async(req,res,next)=>{
    let iphoneCollectionObj = req.app.get("iphoneCollectionObj");
    let iphones = await iphoneCollectionObj.find().toArray();
    res.send({message:iphones});
}))

// 3.Updating existing Iphone's data
productApi.put('/update-iphone',expressErrorHandler(async(req,res,next)=>{
    let iphoneCollectionObj = req.app.get("iphoneCollectionObj");
    let updatedIphoneObj = req.body;
    let uIphoneName= req.body.productTitle;
    let userObj = await iphoneCollectionObj.findOne({productTitle:uIphoneName});
    if(userObj === null)
    {
        res.send({message:`Iphone with name ${uIphoneName} Doesn't Exists.`});
    }
    else
    {
        await iphoneCollectionObj.updateOne({productTitle:uIphoneName},{$set:{...updatedIphoneObj}});
        res.send({message:`Iphone Updated Successfully!!!`})
    }
}))

// 4.Delete an Iphone data
productApi.delete(`/delete-iphone/:iphoneToDeleteName`,expressErrorHandler(async (req,res,next)=>{
    let iphoneCollectionObj = req.app.get("iphoneCollectionObj");
    let iphoneToDeleteNamed = req.params.iphoneToDeleteName;
    let userObj = await iphoneCollectionObj.findOne({productTitle:iphoneToDeleteNamed});
    if(userObj === null)
    {
        res.send({message:`User Doesn't Exists. Try with other user name`});
    }
    else
    {
        await iphoneCollectionObj.deleteOne({productTitle:iphoneToDeleteNamed});
        res.send({message:`deleted iphone successfully`});
    }
}))

// 5.Get a specific Iphone data
productApi.get(`/get-iphone/:id`,expressErrorHandler(async(req,res,next)=>{
    let iphoneCollectionObj = req.app.get("iphoneCollectionObj");
    let iphoneIdToGet = req.params.id;
    let searchObj= await iphoneCollectionObj.findOne({"_id":ObjectId(iphoneIdToGet)});
    if(searchObj === null)
    {
        res.send({message:`product Doesn't Exists. Try with other product`});
    }
    else
    {
        res.send({message:searchObj});
    }
}))

// 6.Adding comments to iphone
productApi.put(`/addComment-iphone/:id`,expressErrorHandler(async(req,res,next)=>{
    let iphoneCollectionObj = req.app.get("iphoneCollectionObj");
    let id = req.params.id;
    
    let CommentObj = req.body;
    let iphoneObj = await iphoneCollectionObj.findOne({"_id":ObjectId(id)});
    if(iphoneObj.comments === undefined)
    {
        // create a new comments array to add to iphone collection.
        comments = [];
        let newCommentObj = {username:CommentObj.username,comment:CommentObj.comment,profileImage:CommentObj.profileImage};
        comments.push(newCommentObj);
        await iphoneCollectionObj.updateOne({"_id":ObjectId(id)},{$set:{...iphoneObj,comments}});
        res.send({message:"New comment added"});
    }
    else
    {
        iphoneObj.comments.push(CommentObj);
        let comments = iphoneObj.comments;
        // updating after adding the new comment to the collection
        await iphoneCollectionObj.updateOne({"_id":ObjectId(id)},{$set:{...iphoneObj,comments:comments}});
        res.send({message:"New comment added"});
    }
}))

// 7.Deleting a specific comment of a user from a specific product
productApi.put(`/deleteComment-iphone/:id`,expressErrorHandler(async(req,res)=>{
    let iphoneCollectionObj = req.app.get("iphoneCollectionObj");
    let id = req.params.id;
    let username = req.body.username;
    await iphoneCollectionObj.updateOne({"_id":ObjectId(id)},{$pull:{comments:{username:username}}});
    res.send({message:"comment deleted"});
}))


// --------------------------------------------------------------------------------------------------
// For Samsung 
// 1.Adding new samsung mobile
productApi.post('/add-samsung',expressErrorHandler(async(req,res,next)=>{

    let samsungCollectionObj = req.app.get('samsungCollectionObj');
    let newSamsung = req.body;
    let samsungObject = await samsungCollectionObj.findOne({productTitle:newSamsung.productTitle});
    // if product already existed
    if(samsungObject !== null)
    {
        res.send({message:"product already existed"});
    }
    else
    {
        await samsungCollectionObj.insertOne(newSamsung);
        res.send({message:"New samsung mobile added to collection"});
    }
}))

// 2.Read all samsung data
productApi.get('/get-samsung',expressErrorHandler(async(req,res,next)=>{
    let samsungCollectionObj = req.app.get("samsungCollectionObj");
    let samsungArray = await samsungCollectionObj.find().toArray();
    res.send({message:samsungArray});
}))

// 3.Updating existing Samsung's data
productApi.put('/update-samsung',expressErrorHandler(async(req,res,next)=>{
    let samsungCollectionObj = req.app.get("samsungCollectionObj");
    let updatedSamsungObj = req.body;
    let uSamsungName= req.body.productTitle;
    let userObj = await samsungCollectionObj.findOne({productTitle:uSamsungName});
    if(userObj === null)
    {
        res.send({message:`Samsung mobile with name ${uSamsungName} Doesn't Exists.`});
    }
    else
    {
        await samsungCollectionObj.updateOne({productTitle:uSamsungName},{$set:{...updatedSamsungObj}});
        res.send({message:`Samsung mobile Updated Successfully!!!`})
    }
}))

// 4.Delete an samsung's data
productApi.delete(`/delete-samsung/:samsungToDeleteObj`,expressErrorHandler(async (req,res,next)=>{
    let samsungCollectionObj = req.app.get("samsungCollectionObj");
    let samsungToDeleteObj = req.params.samsungToDeleteObj;
    let userObj = await samsungCollectionObj.findOne({productTitle:samsungToDeleteObj});
    if(userObj === null)
    {
        res.send({message:`User Doesn't Exists. Try with other user name`});
    }
    else
    {
        await samsungCollectionObj.deleteOne({productTitle:samsungToDeleteObj});
        res.send({message:`deleted samsung successfully`});
    }
}))

// 5.Get a specific Samsung mobile data
productApi.get(`/get-samsung/:id`,expressErrorHandler(async(req,res,next)=>{
    let samsungCollectionObj = req.app.get("samsungCollectionObj");
    let SamsungIdToGet = req.params.id;
    let searchObj= await samsungCollectionObj.findOne({"_id":ObjectId(SamsungIdToGet)});
    if(searchObj === null)
    {
        res.send({message:`product Doesn't Exists. Try with other product`});
    }
    else
    {
        res.send({message:searchObj});
    }
}))

// 6.Adding comments to samsung
productApi.put(`/addComment-samsung/:id`,expressErrorHandler(async(req,res,next)=>{
    let samsungCollectionObj = req.app.get("samsungCollectionObj");
    let id = req.params.id;
    
    let CommentObj = req.body;
    let samsungObj = await samsungCollectionObj.findOne({"_id":ObjectId(id)});
    if(samsungObj.comments === undefined)
    {
        // create a new comments array to add to iphone collection.
        comments = [];
        let newCommentObj = {username:CommentObj.username,comment:CommentObj.comment,profileImage:CommentObj.profileImage};
        comments.push(newCommentObj);
        await samsungCollectionObj.updateOne({"_id":ObjectId(id)},{$set:{...samsungObj,comments}});
        res.send({message:"New comment added"});
    }
    else
    {
        samsungObj.comments.push(CommentObj);
        let comments = samsungObj.comments;
        // updating after adding the new comment to the collection
        await samsungCollectionObj.updateOne({"_id":ObjectId(id)},{$set:{...samsungObj,comments:comments}});
        res.send({message:"New comment added"});
    }
}))

// 7.Deleting a specific comment of a user from a specific product
productApi.put(`/deleteComment-samsung/:id`,expressErrorHandler(async(req,res)=>{
    let samsungCollectionObj = req.app.get("samsungCollectionObj");
    let id = req.params.id;
    let username = req.body.username;
    await samsungCollectionObj.updateOne({"_id":ObjectId(id)},{$pull:{comments:{username:username}}});
    res.send({message:"comment deleted"});
}))

// ----------------------------------------------------------------------------------------------------
// For Xiaomi
// 1.Adding new Xiaomi mobile
productApi.post('/add-xiaomi',expressErrorHandler(async (req,res,next)=>{

    let xiaomiCollectionObj = req.app.get('xiaomiCollectionObj');
    let newXiaomi = req.body;
    let xiaomiObject = await xiaomiCollectionObj.findOne({productTitle:newXiaomi.productTitle});
    // if product already existed
    if(xiaomiObject !== null)
    {
        res.send({message:"product already existed"});
    }
    else
    {
        await xiaomiCollectionObj.insertOne(newXiaomi);
        res.send({message:"New xiaomi mobile added to collection"});
    }
}))

// 2.Read all xiaomi data
productApi.get('/get-xiaomi',expressErrorHandler(async(req,res,next)=>{
    let xiaomiCollectionObj = req.app.get("xiaomiCollectionObj");
    let xiaomiArray = await xiaomiCollectionObj.find().toArray();
    res.send({message:xiaomiArray});
}))

// 3.Updating existing Samsung's data
productApi.put('/update-xiaomi',expressErrorHandler(async(req,res,next)=>{
    let xiaomiCollectionObj = req.app.get("xiaomiCollectionObj");
    let updatedxiaomiObj = req.body;
    let uXiaomiName= req.body.productTitle;
    let userObj = await xiaomiCollectionObj.findOne({productTitle:uXiaomiName});
    if(userObj === null)
    {
        res.send({message:`Xiaomi with name ${uXiaomiName} Doesn't Exists.`});
    }
    else
    {
        await xiaomiCollectionObj.updateOne({productTitle:uXiaomiName},{$set:{...updatedxiaomiObj}});
        res.send({message:`Xiaomi mobile Updated Successfully!!!`})
    }
}))

// 4.Delete an Xiaomi data
productApi.delete(`/delete-xiaomi/:xiaomiToDeleteObj`,expressErrorHandler(async (req,res,next)=>{
    let xiaomiCollectionObj = req.app.get("xiaomiCollectionObj");
    let xiaomiToDeleteObj = req.params.xiaomiToDeleteObj;
    let userObj = await xiaomiCollectionObj.findOne({productTitle:xiaomiToDeleteObj});
    if(userObj === null)
    {
        res.send({message:`User Doesn't Exists. Try with other user name`});
    }
    else
    {
        await xiaomiCollectionObj.deleteOne({productTitle:xiaomiToDeleteObj});
        res.send({message:`deleted xiaomi successfully`});
    }
}))

// 5.Get a specific Xiaomi mobile data
productApi.get(`/get-xiaomi/:id`,expressErrorHandler(async(req,res,next)=>{
    let xiaomiCollectionObj = req.app.get("xiaomiCollectionObj");
    let xiaomiIdToGet = req.params.id;
    let searchObj= await xiaomiCollectionObj.findOne({"_id":ObjectId(xiaomiIdToGet)});
    if(searchObj === null)
    {
        res.send({message:`product Doesn't Exists. Try with other product`});
    }
    else
    {
        res.send({message:searchObj});
    }
}))

// 6.Adding comments to xiaomi
productApi.put(`/addComment-xiaomi/:id`,expressErrorHandler(async(req,res,next)=>{
    let xiaomiCollectionObj = req.app.get("xiaomiCollectionObj");
    let id = req.params.id;
    
    let CommentObj = req.body;
    let xiaomiObj = await xiaomiCollectionObj.findOne({"_id":ObjectId(id)});
    if(xiaomiObj.comments === undefined)
    {
        // create a new comments array to add to iphone collection.
        comments = [];
        let newCommentObj = {username:CommentObj.username,comment:CommentObj.comment,profileImage:CommentObj.profileImage};
        comments.push(newCommentObj);
        await xiaomiCollectionObj.updateOne({"_id":ObjectId(id)},{$set:{...xiaomiObj,comments}});
        res.send({message:"New comment added"});
    }
    else
    {
        xiaomiObj.comments.push(CommentObj);
        let comments = xiaomiObj.comments;
        // updating after adding the new comment to the collection
        await xiaomiCollectionObj.updateOne({"_id":ObjectId(id)},{$set:{...xiaomiObj,comments:comments}});
       res.send({message:"New comment added"});
    }
}))

// 7.Deleting a specific comment of a user from a specific product
productApi.put(`/deleteComment-xiaomi/:id`,expressErrorHandler(async(req,res)=>{
    let xiaomiCollectionObj = req.app.get("xiaomiCollectionObj");
    let id = req.params.id;
    let username = req.body.username;
    await xiaomiCollectionObj.updateOne({"_id":ObjectId(id)},{$pull:{comments:{username:username}}});
    res.send({message:"comment deleted"});
}))


module.exports=productApi;