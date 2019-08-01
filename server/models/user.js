const mongoose =  require('mongoose'); 
const bcrypt  =require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({

     username:{type:String,min:[4,"username too short"],max:[34,"username too long"]},
     email:{type:String,min:[4,"username too short"],max:[34,"username too long"],lowercase:true,unique:true,required:true
     ,match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
},
password:{type:String,
    min:[4,"username too short"],
    max:[34,"username too long"],
    required:"Password is required"
},

rentals:[{type:Schema.Types.ObjectId,ref:'Rental'}]

});
userSchema.methods.hasSamePassword = function(requestedPassword){
     return  bcrypt.compare(requestedPassword,this.password);
  }

userSchema.pre('save',function(){
     const user =this;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
           user.password = hash;
           console.log("encryption done");
        
        });
    });
})



module.exports =  mongoose.model('User',userSchema);