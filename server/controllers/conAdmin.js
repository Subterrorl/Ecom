exports.changeOrderStatus = async (req, res) => {
    try {
        res.json({ message: 'hello changeOrderStatus in controller!' });
    } catch (err) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getOrderAdmin = async (req, res) => {
    try {
        res.json({ message: 'hello getOrderAdmin in controller!' });
    } catch (err) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}