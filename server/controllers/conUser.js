const prisma = require('../config/prisma.js');

exports.listUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select:{
                id:true,
                email:true,
                role:true,
                enabled:true,
                address:true
            }
        });
        res.json(users);
        
    } catch (error) {
        res.status(500).json({ message: 'conUser listUsers Server error' });
    }
};

exports.changeStatus = async (req, res) => {
    try {
        const {id,enabled} = req.body;

        const user = await prisma.user.update({
            where:{id:Number(id)},
            data:{enabled:enabled}
        })

        res.json({ message: 'Status updated successfully', user });
        
    } catch (error) {
        res.status(500).json({ message: 'conUser changeStatus Server error' });
    }
};

exports.changeRole = async (req, res) => {
    try {
        const {id,role} = req.body;

        const user = await prisma.user.update({
            where:{id:Number(id)},
            data:{role:role}
        })

        res.json({ message: 'Role updated successfully', user });
        
    } catch (error) {
        res.status(500).json({ message: 'conUser Server error' });
    }
};

exports.userCart = async (req, res) => {
    try {
        const{cart} = req.body;
        // console.log('cart--->', cart);
        // console.log('req.user--->', req.user.id);

        const user = await prisma.user.findFirst({
            where:{
                id: Number(req.user.id)
            }
        })
        //console.log('user--->', user);

        //delete old cart item
        await prisma.productOnCart.deleteMany({
            where:{
                cart:{
                    orderedById:user.id
                }
            }
        })

        //delete old cart
        await prisma.cart.deleteMany({
            where:{
                orderedById:user.id
            }
        })

        //prepare new cart
        let products = cart.map((item)=>({
            productId: item.id,
            count: item.count,
            price: item.price
        }));

        //total cart price
        let cartTotal = products.reduce((sum,item)=>sum+item.price * item.count,0)
        
        //new cart
        const newCart = await prisma.cart.create({
            data:{
                products : {
                    create: products
                },
                cartTotal: cartTotal,
                orderedById: user.id
            }
        })

        //console.log('newCart--->', newCart);

        res.json({ message: 'add to cart successfully'});
        
    } catch (error) {
        res.status(500).json({ message: 'conUser userCart Server error' });
    }
};

exports.getUserCart = async (req, res) => {
    try {
        const cart = await prisma.cart.findFirst({
            where:{
                orderedById: Number(req.user.id)
            },
            include:{
                products:{
                    include:{
                        product:true
                    }
                }
            }
        })
        // console.log('cart--->', cart);
        res.json({products: cart.products,cartTotal: cart.cartTotal});
        
    } catch (error) {
        res.status(500).json({ message: 'conUser getUserCart Server error' });
    }
};

exports.emptyCart = async (req, res) => {
    try {
        const cart = await prisma.cart.findFirst({
            where:{orderedById: Number(req.user.id)}
        })

        if(!cart){
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        await prisma.productOnCart.deleteMany({
            where:{cartId: cart.id}
        })

        const result = await prisma.cart.deleteMany({
            where:{orderedById: Number(req.user.id)}
        })

        console.log('result--->', result);
        res.json({ message: 'Cart emptied successfully' , deletedCount: result.count});
    } catch (error) {
        res.status(500).json({ message: 'conUser emptyCart Server error' });
    }
};

exports.saveAddress = async (req, res) => {
    try {
        const {address} = req.body;

        const addressUser = await prisma.user.update({
            where:{
                id:Number(req.user.id)
            },
            data:{
                address:address
            }
        })
        console.log('address--->', address);
        res.json({ message: 'Address saved successfully' });
        
    } catch (error) {
        res.status(500).json({ message: 'conUser Server error' });
    }
};

exports.saveOrder = async (req, res) => {
    try {
        //step1: get user cart
        const userCart = await prisma.cart.findFirst({
            where:{
                orderedBy: {
                    id:Number(req.user.id)
                }
            }
        })
        console.log('userCart--->', userCart);
        res.json({ message: 'hello saveOrder' });
        
    } catch (error) {
        res.status(500).json({ message: 'conUser saveOrder Server error' });
    }
};

exports.getOrder = async (req, res) => {
    try {
        res.json({ message: 'hello getOrder' });
        
    } catch (error) {
        res.status(500).json({ message: 'conUser Server error' });
    }
};