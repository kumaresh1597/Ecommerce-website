const express = require('express');
const AuthRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {validateUserRegisterationData,generateToken} = require('../Utils/AuthUtils');
const {createUser,usernameOrEmailAlreadyExists,findUserWithLoginId} = require('../Models/UserModel');


AuthRouter.post('/signUp',async (req,res)=>{

    const {name,username,email,password} = req.body;

    try{

        await validateUserRegisterationData({name,username,email,password});

    } catch(err){
        return res.send({
            status : 400,
            message : "User data error",
            error : err
        })
    }

    try{

        await usernameOrEmailAlreadyExists({email,username});

        const userDb = await createUser({name,username,email,password});

        return res.send({
            status : 201,
            message : "User registered successfully",
            data : userDb
        })

    } catch(err){
        return res.send({
            status : 500,
            message : "Internal server error",
            error : err
        })
    }
})


AuthRouter.post('/logIn',async(req,res)=>{
    const {loginId,password} = req.body;
    console.log("loginId"+loginId);
    console.log("password"+password);

    if(!loginId || !password){
        return res.send({
            status : 400,
            message : "Missing credentials"
        })
    }

    try{

        const userDb = await findUserWithLoginId({loginId});

        const match = await bcrypt.compare(password,userDb.password);

        if(!match){
            return res.send({
                status : 400,
                message : "Incorrect password, please enter correct password"
            })
        }

        const token = generateToken({userId : userDb.id});

        return res.send({
            status : 200,
            message : "User logged in successfully",
            token : token
        })

    }catch(err){
        return res.send({
            status : 500,
            message : "Internal server error",
            error : err
        })
    }
})


AuthRouter.post('/logOut',async(req,res)=>{
    
})


module.exports = {AuthRouter};