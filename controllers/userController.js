let md5 = require("md5");
let UserModel = require("../models/userModel");

module.exports = {
    saveUser : async function(req,res){

        let checkIfUserExist = await UserModel.findOne({
            email : req.body.email,
            status : "Active"
        });

        if(checkIfUserExist){
            return res.status(200).send({
                success : 0,
                error : 1,
                message : "User already exist with same name, try with different email."
            })
        }
        
        try{
            req.body.password = md5(req.body.password)
            let userDetails = new UserModel(req.body)
            let newData = await userDetails.save();

            res.status(200).send({
                success : 1,
                error : 0,
                data : newData
            })
        }catch(err){
            res.status(200).send({
                success : 0,
                error : 1,
                data : err,
                message : "Something went wrong, please send proper data !!"
            })
        }
    },

    login : async function(req,res){

        if(!req.body.username || !req.body.password){
            return res.status(400).send({
                error : 1,
                success : 0,
                message : "Please provide all the details"
            })
        }

        let userDetail = await UserModel.findOne({
            email : req.body.username,
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
        }
    }
}