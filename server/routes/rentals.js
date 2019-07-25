const express = require('express');
const Rental  = require('../models/rental');

const router = express.Router();

router.get('/',function(req,res){
        Rental.find({},function(err,foundRental){
            res.json(foundRental);
        });

});
router.get('/:id',function(req,res){
      const rentalid = req.params.id;
    Rental.findById(rentalid,function(err,foundRental){

        if(err){
            res.status(422).send({errors:[{title:"Rental Error",detail:"Could not find Rental"}]});

        
        }
        res.json(foundRental); 
    });
})



module.exports = router;