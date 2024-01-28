import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createUserJWTToken = async(user, res)=>{
    const token = jwt.sign({
        username: user.username}, 
        "KEY",  //have to put this in .env file
        {expiresIn: '5h'});
    
    res.status(200).json({user, token})
}

//req represents the HTTP request (has request query string, params, body, and HTTP headers)
//res represents the HTTP response
// Authenticate User (Login)
export const login = async(req, res)=>{
    const {email, password} = req.body;
     
    if (!email || !password) {
        res.status(400).json("Please provide email and/or password")
    }
    else{
        try{
            const user = await UserModel.findOne({email: email});
            if (user) {
                if(user.password != password){
                    res.status(400).json("Incorrect password")
                }
                else{
                    createUserJWTToken(user, res);
                }
            }
            else{
                res.status(400).json("User doesn't exist");
            }
        }
        catch(error){
            res.status(500).json(error);
        }
    }
 };

 // Registering new User
export const register = async (req, res) => {
    
    const user = new UserModel({username: req.body.username, 
        password: req.body.password,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email})
    
    try{
        //find out if username is already taken
        const registeredUser = await UserModel.findOne({username: req.body.username});
        if(registeredUser){
            res.status(400).json("Username is taken. Please enter a unique username");
        }
        else{
            const saveUser = await user.save(function(err, data) {
                if (err) return console.error(err)});
            createUserJWTToken(user, res);
        }
    } 
    catch(error) {
        res.status(500).json(error);
    }
};

