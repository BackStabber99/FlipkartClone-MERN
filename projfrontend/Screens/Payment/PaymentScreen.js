import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { v1 as uuidv1 } from "uuid";
const axios = require("axios");

import { BACKEND_URL } from "@env";
import Header from "../../components/Header";
import { PaymentView } from "./PaymentView";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";

const PaymentScreen = () => {
	// console.log("BACKEND_URL", BACKEND_URL);
	const [user, setUser] = useState("");
	const [token, setToken] = useState("");
	const [phone, setPhone] = useState("");

	const [response, setResponse] = useState();

	const [makePayment, setMakePayment] = useState(false);
	const [paymentStatus, setPaymentStatus] = useState("");

	useEffect(() => {
		isAuthenticated()
			.then((res) => {
				if (res.user) {
					setUser(res.user._id);
					setToken(res.token);
					setPhone(res.user.phone);
				}
				// console.log(res);
			})
			.catch((err) => {
				console.log("isAuthenticated error is Payment", err);
			});
	}, []);

	const cartInfo = {
		id: "5eruyt7asdas647623a5asd1612asd5523", //use uuid here uuidv1()
		description: "BhartiyaHandiCraft Order",
		amount: 1, //get from cart
	};

	const onCheckStatus = async (paymentResponse) => {
		setPaymentStatus("Please wait while confirming your payment!");
		setResponse(paymentResponse);

		let jsonResponse = JSON.parse(paymentResponse);
		// perform operation to check payment status

		try {
			//API CALL
			// "http://192.168.29.45:8000/api/payment",
			const stripeResponse = await axios({
				method: "post",
				url: `${BACKEND_URL}/paymentByCard/${user}`,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
				data: {
					email: `${phone}@bhartiyahandicraft`, //"mayank@gmail.com",
					product: cartInfo,
					authToken: jsonResponse,
					totalPrice: 10, //get from cart
				},
			});

			// console.log("stripeResponse", stripeResponse);
			if (stripeResponse) {
				const { paid } = stripeResponse.data;
				if (paid === true) {
					setPaymentStatus("Payment Success");
					// console.log("Payment Success");
				} else {
					setPaymentStatus("Payment failed due to some issue");
					// console.log("Payment failed due to some issue");
				}
			} else {
				setPaymentStatus(" Payment failed due to some issue");
				// console.log(" Payment failed due to some issue");
			}
		} catch (error) {
			console.log(error);
			setPaymentStatus(" Payment failed due to some issue");
		}
	};

	const paymentUI = () => {
		if (!makePayment) {
			return (
				<View>
					{/* <Header /> */}

					<View
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							height: 300,
							marginTop: 50,
						}}
					>
						<Text style={{ fontSize: 25, margin: 10, fontFamily: "zilla-med" }}>
							{" "}
							Make Payment{" "}
						</Text>
						<Text style={{ fontSize: 16, margin: 10, fontFamily: "zilla-med" }}>
							{" "}
							Product Description: {cartInfo.description}{" "}
						</Text>
						<Text style={{ fontSize: 16, margin: 10, fontFamily: "zilla-med" }}>
							{" "}
							Payable Amount: {cartInfo.amount}{" "}
						</Text>

						<TouchableOpacity
							style={{
								height: 60,
								width: 300,
								backgroundColor: "#FF5733",
								borderRadius: 30,
								justifyContent: "center",
								alignItems: "center",
							}}
							onPress={() => {
								setMakePayment(true);
							}}
						>
							<Text
								style={{ color: "#FFF", fontSize: 20, fontFamily: "zilla-med" }}
							>
								Proceed To Pay
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			);

			// show to make payment
		} else {
			if (response !== undefined) {
				return (
					<View>
						{/* <Header /> */}
						<View
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								height: 300,
								marginTop: 50,
							}}
						>
							<Text style={{ fontSize: 25, margin: 10 }}>
								{" "}
								{paymentStatus}{" "}
							</Text>
							<Text style={{ fontSize: 16, margin: 10 }}> {response} </Text>
						</View>
					</View>
				);
			} else {
				/* <Header /> */
				return (
					<PaymentView
						onCheckStatus={onCheckStatus}
						product={cartInfo.description}
						amount={cartInfo.amount}
					/>
				);
			}
		}
	};

	return <View style={styles.container}>{paymentUI()}</View>;
};

const styles = StyleSheet.create({
	container: { flex: 1 },
	navigation: { flex: 2, backgroundColor: "red" },
	body: {
		flex: 10,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "yellow",
	},
	footer: { flex: 1, backgroundColor: "cyan" },
});

export default PaymentScreen;
