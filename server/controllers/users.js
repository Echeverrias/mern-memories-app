
import bcrypt from 'bcryptjs'; //to manage the passwords
import jwt from 'jsonwebtoken'; // to store the users in the browser for a period of time (Ej: '120', 60, "10h", "7d", "2 days")
import User from '../models/user.js';

export const signIn =  (req, res) => {
    
    console.log('signIn');
    const { email, password } = req.body;
    User.findOne({email})
        .then(async (user) => {
            if(!user) return res.status(404).json({ message: "User or password incorrect"});
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if(!isPasswordCorrect) return res.status(401).json({message: 'User or password incorrect'});
            const token = jwt.sign({email: user.email, password: user.password, id: user._id}, 'secret', {expiresIn: '1h'});
            res.status(200).json({user:user, token: token})
        })
        .catch((error) => {
            console.log('error en signin')
            res.status(500).json({message: error})
        })
};

export const signUp = async (req, res) => {
    try{
        console.log('signUp');
        const userData = req.body;
        const { email, password, firstName, lastName } = req.body;
        let user = await User.findOne({email: userData.email})
        if (user) return res.status(400).json({ message: "The user already exists"});
        const hashedPassword = await bcrypt.hash(userData.password, 12);
        User.create({...userData, password: hashedPassword, name: `${userData.firstName} ${userData.lastName}`})
            .then((user) => { 
                console.log(user);
                const token = jwt.sign({email: user.email, password: hashedPassword, id: user._id}, 'secret', {expiresIn: '1h'});
                res.status(200).json({user: user, token: token});
            })
            .catch((error) => res.status(500).json({message: error.message}))
    }
    catch(error){
        console.log('Error 500');
        res.status(500).json({message: error.message});
    }        
};


