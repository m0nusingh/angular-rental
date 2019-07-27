const express = require('express');
 
const mongoose  = require('mongoose');
const config = require('./config/dev');
const Rental =  require('./models/rental');
const rentalRoutes = require('./routes/rentals');

const FakeDb  =require('./models/fake-db');

mongoose.connect(config.URI).then(()=>{
    const fakedb = new FakeDb();
     fakedb.seedDb();
});

const app = express();

app.use('/api/v1/rentals',rentalRoutes);

app.get('/rentals',function(req,res){
   res.json({'success':true});

});

const PORT = 3001
app.listen(PORT,function(){
    console.log("Server running");
});