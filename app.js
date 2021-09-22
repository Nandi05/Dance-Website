const express=require('express');
const path=require('path');
const { urlencoded } = require('body-parser');
const app=express();
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/contactDance')
const port=80;
const bodyparser=require('body-parser');

//DEFINING MONGOOSE SCHEMA
var contactSchema=new mongoose.Schema({
    phone: String,
    address: String,
    gender: String,
    email: String,
    danceform: String,
});

//CREATING A MODEL BASED ON THE SCHEMA DEFINED
var contact= new mongoose.model('contact',contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))//for serving static files
app.use(urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine','pug')//to set the template engine as pug
app.set('views',path.join(__dirname,'views'))//to set the views directory means knsi directory se read krna chte h sari template files ko

//ENDPOINTS
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params)
})
app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params)
})
app.post('/contact',(req,res)=>{
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    });
    // res.status(200).render('contact.pug')
})


//START THE SERVER
app.listen(port,()=>{
    console.log(`the application started successfully  on port ${port}`);
})
