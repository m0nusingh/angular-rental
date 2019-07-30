const express = require('express');
 
const mongoose  = require('mongoose');
const config = require('./config/dev');
const Rental =  require('./models/rental');
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const FakeDb  =require('./models/fake-db');
const bodyParser = require('body-parser');
mongoose.set('useCreateIndex', true);
mongoose.connect(config.URI).then(()=>{
    const fakedb = new FakeDb();
    // fakedb.cleanDb();
    //  fakedb.seedDb();
}); 

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/rentals',rentalRoutes);

app.use('/api/v1/users',userRoutes)
app.get('/rentals',function(req,res){
    console.log("herer");
   res.json({'success':true});

});

const PORT = 3001
app.listen(PORT,function(){
    console.log("Server running");
});