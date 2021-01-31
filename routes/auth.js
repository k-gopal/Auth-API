import Router from 'express';
import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerValidation, loginValidation } from '../validation.js';

const authRouter = Router();


authRouter.post('/register', async (req,res) => {

    //validating user...

    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send({message: error.details[0].message});
    }

    //checking if user exists...
    const userExist = await User.findOne({email: req.body.email});
    if (userExist) return res.status(400).send({message:'Email already exists.'});

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //creating new user...
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (error) {
        res.status(400).send(error);
        
    }
});



authRouter.post('/login', async (req, res) => {
    //validating user...
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send({message: error.details[0].message});
    }

    //checking if user exists...
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send({message:"Email doesn't exists."});

    //validating password....
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send({message:"Password doesn't match."});

    //create a user token using jwt
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_KEY);
    res.header('auth-token', token);
});


export default authRouter;