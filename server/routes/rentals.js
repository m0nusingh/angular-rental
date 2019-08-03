const express = require('express');
const Rental  = require('../models/rental');

const router = express.Router();

router.get('/',function(req,res){
      Rental.find({})
      .select('-bookings')
      .exec(function(err,foundRental){
        if(err){
        return   res.status(422).send({errors:[{title:"Rental Error",detail:"Could not find Rental"}]});
        }
        return res.json(foundRental); 
    });

       
});
router.get('/:id',function(req,res){
      const rentalid = req.params.id;
      Rental.findById(rentalid)
      .populate('user','username -_id')
      .populate('bookings',"startAt endAt -_id")
      .exec(function(err,foundRental){
          if(err){
          return   res.status(422).send({errors:[{title:"Rental Error",detail:"Could not find Rental"}]});
          }
          return res.json(foundRental); 
      });

    });


   


module.exports = router;