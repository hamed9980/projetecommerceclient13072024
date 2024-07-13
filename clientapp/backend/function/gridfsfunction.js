const express = require('express');
 
const mongoose=require('mongoose');
 
const mongodb=require('mongodb')
 

const url="mongodb://localhost:27017/yourDB-name"
 const Busboy = require('busboy');
const filesrouter=express.Router()
const uri = 'mongodb://localhost:27017';
const dbName = 'yourDB-name';


filesrouter.get('/profileimage/:id',async (req,resp)=>{
    var client=await mongodb.MongoClient.connect(uri, function(error, client) {
        assert.ifError(error);
      
        
      
        return client
      })
      const { ObjectId } = require('mongodb');
      const db = client.db(dbName);
      var bucket = new mongodb.GridFSBucket(db,{bucketName:'fs'});
      try{
        if(ObjectId.isValid(req.params.id)){
      var downloadStream = bucket.openDownloadStream(new ObjectId(req.params.id));
      downloadStream.pipe(resp) 
        }
    else{
        req.params.id="666adaf4f91fab2291a14abb"
        var downloadStream = bucket.openDownloadStream(new ObjectId(req.params.id));
        downloadStream.pipe(resp) 
    }
      
     
      }catch(ex){
        req.body.id="666adaf4f91fab2291a14abb"
        var downloadStream = bucket.openDownloadStream(new ObjectId(req.params.id));
      
      downloadStream.pipe(resp) 
      }
})

 filesrouter.post('/profile', async (req, res) => {
     
    const busboy = Busboy({ headers: req.headers });
    var client=await mongodb.MongoClient.connect(uri, function(error, client) {
        assert.ifError(error);
      
        
      
        return client
      })
      const db = client.db(dbName);
      var bucket = new mongodb.GridFSBucket(db);
      var data=[]
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        const saveTo = "filename";
        // here we PIPE the file to DB.
        var fs1=bucket.openUploadStream(saveTo)
        file.pipe(fs1);
        data.push(fs1.id);
        // Handle file stream
        file.on('data', data => {
            console.log(`File [${fieldname}] got
            ${data.length} bytes`);
            
        });
        
        file.on('end', () => {
            console.log(`File [${fieldname}] Finished`);
        });
    });
    
    busboy.on('finish', () => {
        console.log('File upload complete');
         
        res.status(200).send(data);
    });
    
    // Pipe the request stream to Busboy
    req.pipe(busboy);
});

module.exports={filesrouter};
