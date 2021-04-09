const OrderSchema = require("../models/order");
const Stripe = require("stripe");
const { v4: uuidv4 } = require("uuid");

exports.paymentByCard = async (req, res) => {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
	const { email, product, authToken, totalPrice } = req.body;
	const { token } = authToken;
	const { card } = token;

	// console.log("req", req);

	// console.log("card", card);

	console.log(
		"============================================== payment initiate ======================="
	);

	// const userProduct = req.body;

	// unique ID generated by client
	const idempotencyKey = uuidv4();

	try {
		const customer = await stripe.customers.create({
			email: email,
			source: token.id,
		});

		console.log("Customer Created.....");
		console.log(customer);

		const response = await stripe.charges.create(
			{
				amount: totalPrice * 100,
				currency: "INR",
				customer: customer.id,
				receipt_email: email,
				// description: userProduct.product.description,
				shipping: {
					name: card.name,
					address: {
						line1: "Mumbai",
						country: card.address_country,
					},
				},
			},
			{ idempotencyKey: idempotencyKey }
		);

		// console.log("charge response");
		// console.log(response);

		//TODO: add to changes to Order Model

		res.json(response);
	} catch (err) {
		console.log(
			"=========================================== error =========================="
		);
		console.log(err);
		res.json(err);
	}
};

exports.paymentByCash = async (req, res) => {
	const products = req.body.products;

	// products.map((product) =>{

	//for loop used to make code synchronous
	for (let i = 0; i < products.length; i++) {
		let order = new OrderSchema();

		order.user = req.profile._id;
		order.product = products[i].productId;

		order.transactionId = uuidv4();

		order.save((err, order) => {
			if (err) {
				return res.status(500).json({
					error: "Error in saving order in DB!",
				});
			}
			res.status(200).json(order);
		});
	}
};

exports.getOrdersByUserId = async (req, res) => {
	OrderSchema.find({ user: req.profile._id }).exec((err, orders) => {
		if (err || !orders) {
			return res.status(500).json({
				error: "Error in fetching orders from DB!",
			});
		}

		if (orders.length == 0) {
			return res.status(200).json({ msg: "no order placed yet" });
		}

		return res.status(200).json({ orders });
	});
};
