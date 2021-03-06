const mongoose =  require('mongoose'); 
const bcrypt  =require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({

     username:{type:String,min:[4,"username too short"],max:[34,"username too long"]},
     email:{type:String,min:[4,"username too short"],max:[34,"username too long"],lowercase:true,unique:true,required:true
     ,match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
},
password:{type:String,
    required:"Password is required"
},

rentals:[{type:Schema.Types.ObjectId,ref:'Rental'}],
bookings: [ {type:Schema.Types.ObjectId,ref:'Booking'}]

});
userSchema.methods.hasSamePassword = function(requestedPassword){
  
     return  (requestedPassword===this.password);
  }

  


module.exports =  mongoose.model('User',userSchema);