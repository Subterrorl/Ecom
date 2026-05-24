const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma.js');

exports.authCheck = async (req, res, next) => {
    try {
        const headerToekn = req.headers.authorization;
        console.log('headerToekn--->', headerToekn);
        if(!headerToekn) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const token = headerToekn.split(' ')[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;

        const user = await prisma.user.findFirst({
            where:{
                email:req.user.email
            }
        })

        if(!user.enabled) {
            return res.status(403).json({ message: 'User is disabled' });
        }
        //console.log(req.user);
        // console.log('authCheck middleware executed');
        next();
    } catch (error) {
        res.status(500).json({ message: 'Token is not valid' });
    }
}


exports.adminCheck = async (req, res, next) => {
    try{
        const {email} = req.user;
        
        const adminUser = await prisma.user.findFirst({
            where:{
                email:email
            }
        })

        if(!adminUser || adminUser.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access denied' });
        }
        //console.log('adminUser', adminUser);
        next();
    }catch(error){
        res.status(500).json({ message: 'Error Admin access denied' });
    }
}