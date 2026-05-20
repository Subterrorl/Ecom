const prisma = require('../config/prisma.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        //code
        const { email, password } = req.body;

        //step 1 validate body
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        //step 2 check in DB
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        if(user){
            return res.status(400).json({ error: 'Email already exists' });
        }

        //step 3 hash password
        const hashPassword = await bcrypt.hash(password, 10);
        
        //step 4 save in DB
        await prisma.user.create({
            data: {
                email: email,
                password: hashPassword
            }
        });

        res.json({ message: 'User registered successfully' });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.login = async (req, res) => {
    try {
        //code
        const { email, password } = req.body;
        
        //step 1 check email
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
        if(!user){
            return res.status(400).json({ error: 'Invalid email' });
        }
        if(!user.enabled){
            return res.status(403).json({ error: 'Your account is disabled, please contact admin' });
        }

        //step 2 check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ error: 'Invalid password' });
        }

        //step 3 create payload
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        //step 4 generate token
        jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' },
            (err, token) => {
                if(err){
                    return res.status(500).json({ error: 'Error in token generation' });
                }
                res.json({ payload, token });
            });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.currentUser = async (req, res) => {
    try {
        res.json({ message: 'Hello current user in controller!' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}

