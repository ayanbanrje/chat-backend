let md5 = require("md5");
let UserModel = require("../models/userModel");

module.exports = {
    saveUser : async function(req,res){

        let checkIfUserExist = await UserModel.findOne({
            email : req.body.email,
            status : "Active"
        });

        if(checkIfUserExist){
            return res.status(401).send({
                success : 0,
                error : 1,
                message : "User already exist with same email, try with different email."
            })
        }
        
        try{
            req.body.password = md5(req.body.password)
            let userDetails = new UserModel(req.body)
            let newData = await userDetails.save();

            res.status(200).send({
                success : 1,
                error : 0,
                data : newData,
                message : "Registration was successful !!"
            })
        }catch(err){
            res.status(401).send({
                success : 0,
                error : 1,
                data : err,
                message : "Something went wrong, please send proper data !!"
            })
        }
    },

    login : async function(req,res){

        if(!req.body.email || !req.body.password){
            return res.status(401).send({
                error : 1,
                success : 0,
                 message : "Please provide correct details"
             })
         }

       
        let userDetail = await UserModel.findOne({
            email : req.body.email,
            password : md5(req.body.password)
        })

        if(userDetail){
            res.status(200).send({
                success :  1,
                error : 0,
                message : "Login was successful",
                data : {
                    userId : userDetail._id,
                    email : userDetail.email,
                    name : userDetail.name
                }
            })
        }else{
            res.status(402).send({
                success :  0,
                error : 1,
                message : "Wrong username or password",
                data : {
                }
            })
        }

        else{
            return res.status(401).send({
                success: 0,
                error: 1,
                message : "Email Id or Password is wrong"

            })

        }

     },
    usersList:async function(req,res){
        var user = await UserModel.find();
        res.send({
          success:1,
          error:0,
          data:user,
          message:"User list fetched succesfully"
        });
      }
}