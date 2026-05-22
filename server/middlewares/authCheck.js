const jwt = require('jsonwebtoken');

exports.authCheck = (req, res, next) => {
    try {
        const headerToekn = req.headers.authorization;
        console.log('headerToekn--->', headerToekn);
        console.log('authCheck middleware executed');
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error authCheck' });
    }
}