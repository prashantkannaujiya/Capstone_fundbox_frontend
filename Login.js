var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var cors=require('cors');
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/";
var jwt=require('jsonwebtoken')
app.set('views','./views');
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.get("/",function(req,res){
    res.sendFile(__dirname+"/Login_UI.html");
})
app.get("/Register",function(req,res)
{
    res.sendFile(__dirname+"/Register.html");
})
app.post("/Register",function(req,res){
console.log("Request is here")
    MongoClient.connect(url,function(err,con){
        console.log(req.body);
        if(err)console.log(err)
        else{
            var db=con.db('login');
            db.collection('fund').insertOne(req.body)
            .then((data)=>{console.log(data);res.send(data)})
            .catch(err=>console.log('error'))
        }
    })
})
app.get("/Login_user",function(req,res){
    res.sendFile(__dirname+'/Login_user.html')
})
app.post("/Login",function(req,res){
   
    MongoClient.connect(url,function(err,con){
        console.log(req.body);
       
            var db=con.db('login');
            db.collection('fund').find({name:req.body.name}).toArray().then((data)=>{
console.log(data);
if(data.length!=0)
{
    if(data[0].password==req.body.password)
    {
        var token=jwt.sign(data[0].name,"Vishnu");
        res.send({message:'success',token,name:data[0].name});
    }
    else
    {
        res.send({message:'Wrong password'});
    }
    }

else{
    res.send([]);
}
            }
           )
          })

})
app.get('/authorize',(req,res)=>{
    res.sendFile(__dirname+'/auth.html');
})
app.get('/auth/:token',(req,res)=>{
  var tken=req.params.token;
  console.log(tken);
  var ds=jwt.verify(req.params.token,'Vishnu');
  res.send({message:'approved',data:ds});
})
app.post('/submitcampaign',(req,res)=>{
    console.log(req.body);
MongoClient.connect(url,function(err,con){
var db=con.db('login');
db.collection('fund').findOneAndUpdate({name:req.body.name},{$push:{campaign:req.body.campaign}}).then((data)=>{console.log(data);res.send(data);})})})


app.get('/history/:user',(req,res)=>{
var user=req.params.user;
MongoClient.connect(url,(err,con)=>{
    var db=con.db('login');
    db.collection('fund').find({name:user}).toArray().then((data)=>{console.log(data);res.send(data)})

})
})
app.get('/findAll/:cat',(req,res)=>{
    var k=req.params.cat;
    console.log(k);
    MongoClient.connect(url,(err,con)=>{
        var db=con.db('login');
        db.collection('fund').find({'campaign.category':k}).toArray().then((data)=>{
            var d=[];
            data.forEach((a)=>{
                for(var i=0;i<a.campaign.length;i++)
                {
                    if(a.campaign[i].category==k)
                    {
                        d.push(a.campaign[i]);
                    }
                }
            })
            res.send(d);
        }).catch(err=>console.log(err))
    })
})
app.get('/erase/:title', (req,res)=>{
    var t=req.params.title;
    MongoClient.connect(url,async(err,con)=>{
        var db=con.db('login');
        console.log(t)
       var s=await db.collection('fund').find({'campaign.title':t}).toArray();
       console.log(s);
        var z= await db.collection('fund').update({'campaign.title':t},{$pull:{campaign:{title:t}}})
       var ss=await db.collection('fund').find({name:s[0].name}).toArray();
       res.send(ss);
       console.log(ss);
    })
})
app.get('/clear',(req,res)=>{
   
    
    MongoClient.connect(url,(err,con)=>{
        var db=con.db('login');
        db.collection('fund').deleteMany({})
    })
})
app.listen(2100,()=>{console.log('OKKK, running')});