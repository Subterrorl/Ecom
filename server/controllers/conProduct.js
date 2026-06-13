const prisma = require('../config/prisma.js');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUNDINARY_CLOUD_NAME,
    api_key: process.env.CLOUNDINARY_API_KEY,
    api_secret: process.env.CLOUNDINARY_API_SECRET
});
exports.create = async (req, res) => {
    try {
        const { title, description, price, quantity, categoryId, images } = req.body;
        const product = await prisma.product.create({
            data: {
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    create: images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        });

        console.log(title, description, price, quantity, categoryId, images);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server create error' });
    }
};

exports.list = async (req, res) => {
    try {
        const { count } = req.params;
        const products = await prisma.product.findMany({
            take: parseInt(count),
            orderBy: { createdAt: 'desc' },
            include: {
                category: true,
                images: true
            }
        });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server list error' });
    }
};

exports.read = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await prisma.product.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                category: true,
                images: true
            }
        });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server read error' });
    }
};

exports.update = async (req, res) => {
    try {
        const { title, description, price, quantity, categoryId, images } = req.body;

        await prisma.image.deleteMany({
            where: {
                productId: Number(req.params.id)
            }
        });

        const product = await prisma.product.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    create: images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        });


        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server update error' });
    }
};

exports.remove = async (req, res) => {
    try {
        const { id } = req.params;
        //step 1 ค้นหาสินค้า include images
        const product = await prisma.product.findFirst({
            where: { id: Number(id) },
            include: { images: true }
        })
        if (!product) {
            return res.status(400).json({ error: 'Product not found' });
        }
        //step 2 promise ลบรูปภาพใน cloudinary ลบแบบรอฉันด้วย
        const deletedImage = product.images.map((image) =>
            new Promise((resolve, reject) => {
                cloudinary.uploader.destroy(image.public_id, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                })
            })
        )
        await Promise.all(deletedImage);
        //step 3 ลบสินค้า
        await prisma.product.delete({
            where: {
                id: Number(id)
            }
        });

        res.json('Delete Success');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server remove error' });
    }
};

exports.listby = async (req, res) => {
    try {
        const { sort, order, limit } = req.body;
        console.log(sort, order, limit);
        const product = await prisma.product.findMany({
            take: limit,
            orderBy: { [sort]: order },
            include: {
                category: true
            }
        })
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server listbyerror' });
    }
};

const handleQuery = async (req, res, query) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                title: {
                    contains: query
                }
            },
            include: {
                category: true,
                images: true
            }

        })
        res.json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Search handleQuery error' });
    }
}

const handlePrice = async (req, res, priceRange) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                price: {
                    gte: priceRange[0],
                    lte: priceRange[1]
                }
            },
            include: {
                category: true,
                images: true
            }
        })
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Search handlePrice error' });
    }
}

const handleCategory = async (req, res, categoryId) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId: {
                    in: categoryId.map((id) => Number(id))
                }
            },
            include: {
                category: true,
                images: true
            }
        })
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Search handleCategory error' });
    }
}

exports.searchFilter = async (req, res) => {
    try {
        const { query, category, price } = req.body;

        if (query) {
            console.log('query--->', query);
            await handleQuery(req, res, query);
        }

        if (category) {
            console.log('category--->', category);
            await handleCategory(req, res, category);
        }

        if (price) {
            console.log('price--->', price);
            await handlePrice(req, res, price);
        }

        //res.json('hello searchFilter products in controller!');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server searchFilter error' });
    }
};



exports.createImages = async (req, res) => {
    try {

        const result = await cloudinary.uploader.upload(req.body.image, {
            public_id: 'Roitai-' + Date.now(),
            resource_type: 'auto',
            folder: 'Ecom2026'
        })

        res.send(result)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server createImage error' });
    }
}

exports.removeImage = async (req, res) => {
    try {

        const { public_id } = req.body;
        //console.log(public_id);
        cloudinary.uploader.destroy(public_id, (result) => {
            res.json('remove image success');
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server removeImage error' });
    }
}