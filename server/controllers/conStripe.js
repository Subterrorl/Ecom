const prisma = require("../config/prisma.js");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.payment = async (req, res) => {
    try {

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 5000,
            currency: "thb",
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "conStripe payment Server error" });
    }
};