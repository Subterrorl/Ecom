const prisma = require('../config/prisma.js');

exports.create = async(req, res) => {
    try {
        const {title, description, price, quantity, categoryId, images} = req.body;
        const product = await prisma.product.create({
            data: {
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId : parseInt(categoryId),
                images: {
                    create:images.map((item) => ({
                            asset_id    :   item.asset_id,
                            public_id   :   item.public_id,
                            url         :   item.url,
                            secure_url  :   item.secure_url
                        }))
                }
            }
        });

        console.log(title, description, price, quantity, categoryId, images);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.list = async(req, res) => {
    try {
        res.json('hello list products in controller!');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.update = async(req, res) => {
    try {
        res.json('hello update products in controller!');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.remove = async(req, res) => {
    try {
        res.json('hello remove products in controller!');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.listby = async(req, res) => {
    try {
        res.json('hello list products by criteria in controller!');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.searchFilter = async(req, res) => {
    try {
        res.json('hello searchFilter products in controller!');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};