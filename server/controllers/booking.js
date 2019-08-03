const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');
const moment = require('moment');
module.exports.createBooking  = function(req,res){

    const {startAt,endAt,totalPrice,guests,days,rental} = req.body;

    const user = res.locals.user;
    const booking = new Booking({startAt,endAt,totalPrice,guests,days});
    Rental.findById(rental._id).
    populate('bo0kings')
    .populate('user')
    .exec(function(err,foundRenatal){
        if(err){
            return  res.status(422).send({errors:normalizeErrors(err.errors)});
        }
        if(foundRenatal.user.id === user.id)
        {
            return  res.status(422).send({errors:[{title:"Invalid Booking",detail:"Cannot create booking on your rental"}]});
        }

        if(isValidBooking(booking,foundRenatal)){
            booking.user = user;             
            booking.rental  =foundRenatal
            foundRenatal.bookings.push(booking);

            booking.save(function(err){
                if(err){
                    return  res.status(422).send({errors:normalizeErrors(err.errors)});
                }
                    });
            foundRenatal.save();   
            
            User.update({_id:user.id},{  $push:{bookings:booking}},function(){})
            return res.json({startAt:booking.startAt,endAt:booking.endAt});

        }else{

            return  res.status(422).send({errors:[{title:"Invalid Booking",detail:"Choosen dates already booked"}]});
        }
        
         return rental.json({booking,foundRenatal});
    })
      res.json({'create booking':'ok'});

}

function isValidBooking(proposeBooking,rental){
        let isValid =  true;
       if(rental.bookings&&rental.bookings.length > 0){
         isValid  =    rental.bookings.every(function(booking){
               const proposedStart = moment(proposeBooking.startAt);
               const proposedEnd = moment(proposeBooking.endAt);

               const actualStart = moment(booking.startAt);
               const actualEnd  = moment(booking.endAt);

                return ((actualEnd<proposedStart&& actualEnd<proposedEnd)||(proposedEnd<actualEnd&&proposedEnd<actualStart));
              
        });
       }
         
         return isValid;
}