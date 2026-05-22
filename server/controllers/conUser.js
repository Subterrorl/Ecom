exports.getAllUsers = async (req, res) => {
    try {
        res.json({ message: 'Get all users' });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};