const prisma = require("../config/prisma.js");

exports.listUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                enabled: true,
                address: true,
            },
        });
        res.json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "conUser listUsers Server error" });
    }
};

exports.changeStatus = async (req, res) => {
    try {
        const { id, enabled } = req.body;

        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { enabled: enabled },
        });

        res.json({ message: "Status updated successfully", user });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "conUser changeStatus Server error" });
    }
};

exports.changeRole = async (req, res) => {
    try {
        const { id, role } = req.body;

        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { role: role },
        });

        res.json({ message: "Role updated successfully", user });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "conUser Server error" });
    }
};

exports.userCart = async (req, res) => {
    try {
        const { cart } = req.body;
        // console.log('cart--->', cart);
        // console.log('req.user--->', req.user.id);

        const user = await prisma.user.findFirst({
            where: {
                id: Number(req.user.id),
            },
        });
        //console.log('user--->', user);

        //delete old cart item
        await prisma.productOnCart.deleteMany({
            where: {
                cart: {
                    orderedById: user.id,
                },
            },
        });

        //delete old cart
        await prisma.cart.deleteMany({
            where: {
                orderedById: user.id,
            },
        });

        //prepare new cart
        let products = cart.map((item) => ({
            productId: item.id,
            count: item.count,
            price: item.price,
        }));

        //total cart price
        let cartTotal = products.reduce((sum, item) => sum + item.price * item.count, 0);

        //new cart
        const newCart = await prisma.cart.create({
            data: {
                products: {
                    create: products,
                },
                cartTotal: cartTotal,
                orderedById: user.id,
            },
        });

        //console.log('newCart--->', newCart);

        res.json({ message: "add to cart successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "conUser userCart Server error" });
    }
};

exports.getUserCart = async (req, res) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                orderedById: Number(req.user.id),
            },
            include: {
                products: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        res.json({ products: cart.products, cartTotal: cart.cartTotal });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "conUser getUserCart Server error" });
    }
};

exports.emptyCart = async (req, res) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: { orderedById: Number(req.user.id) },
        });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        await prisma.productOnCart.deleteMany({
            where: { cartId: cart.id },
        });

        const result = await prisma.cart.deleteMany({
            where: { orderedById: Number(req.user.id) },
        });

        console.log("result--->", result);
        res.json({
            message: "Cart emptied successfully",
            deletedCount: result.count,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "conUser emptyCart Server error" });
    }
};

exports.saveAddress = async (req, res) => {
    try {
        const { address } = req.body;

        const addressUser = await prisma.user.update({
            where: {
                id: Number(req.user.id),
            },
            data: {
                address: address,
            },
        });
        console.log("address--->", address);
        res.json({ message: "Address saved successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "conUser Server error" });
    }
};

exports.saveOrder = async (req, res) => {
    try {
        //step0: check stripe
        const { id, amount, status, currency } = req.body.paymentIntent;


        //step1: get user cart
        const userCart = await prisma.cart.findFirst({
            where: {
                orderedById: Number(req.user.id),
            },
            include: { products: true },
        });

        //check empty cart
        if (!userCart || userCart.products.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        //check quantity
        for (const item of userCart.products) {
            const product = await prisma.product.findUnique({
                where: { id: item.productId },
                select: { quantity: true, title: true },
            });

            if (!product || item.count > product.quantity) {
                return res.status(400).json({ message: `Product ${product.title} is out of stock` });
            }
        }

        //create order
        const order = await prisma.order.create({
            data: {
                products: {
                    create: userCart.products.map((item) => ({
                        productId: item.productId,
                        count: item.count,
                        price: item.price,
                    })),
                },
                orderedBy: {
                    connect: { id: Number(req.user.id) },
                },
                cartTotal: userCart.cartTotal,
                stripePaymentId: id,
                amount: Number(amount),
                status: status,
                currentcy: currency,
            },
        });

        //update product quantity
        const update = userCart.products.map((item) => ({
            where: { id: item.productId },
            data: {
                quantity: { decrement: item.count },
                sold: { increment: item.count }
            }
        }))

        await Promise.all(
            update.map((updateItem) => prisma.product.update(updateItem))
        )

        await prisma.cart.deleteMany({
            where: { orderedById: Number(req.user.id) }
        });

        console.log("update--->", update);

        res.json({ message: "Order saved successfully", order });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "conUser saveOrder Server error" });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: { orderedById: Number(req.user.id) },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if (orders.length === 0) {
            return res.status(400).json({ message: 'No order' })
        }
        console.log(orders)
        res.json({ message: "hello getOrder", orders });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "conUser getOrder Server error" });
    }
};
