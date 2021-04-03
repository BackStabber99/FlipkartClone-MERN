import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import LottieView from "lottie-react-native";
import Header from "../../components/Header";
import CartList from "./Components/CartList";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";
import { getAllCartItemsByUserId } from "./APICall/cartAPI";

const Cart = ({ routes, navigation }) => {
	const [showCart, setShowCart] = useState(false);
	const [itemList, setItemList] = useState([]);
	const [language, setLanguage] = useState("en");
	const [loading, setLoading] = useState(false);

	// const [count, setCount] = useState(itemList.length);

	// const rerender = () => {
	// 	setCount(count - 1);
	// };

	useEffect(() => {
		isAuthenticated()
			.then((res) => {
				// console.log(res.user._id);
				if (res.user) {
					getAllCartItemsByUserId(res.user._id, res.token)
						.then((res) => {
							setItemList(res.data);
							setShowCart(true);
							// console.log(res.data);
							// console.log(count);
						})
						.catch((err) => {
							console.log("cart list fetching error: " + err);
						});
				} else setShowCart(false);
			})
			.catch((err) => {
				console.log("cart screen error: " + err);
			});
		// const {user} =
		// console.log(isAuthenticated().user);
	}, []);

	const mainWork = (lang) => {
		setLanguage(lang);
		setLoading(false);
	};
	const changeLanguage = (lang) => {
		setLoading(true);
		setTimeout(() => {
			mainWork(lang);
		}, 500);
	};

	return (
		<View>
			<View style={loading === true ? styles.overlay : null}>
				{loading === true ? (
					<LottieView
						style={styles.lottie}
						autoPlay
						loop
						source={require("../../assets/animations/loader.json")}
					/>
				) : null}
				<Header
					language={language}
					changeLanguage={changeLanguage}
					navigation={navigation}
				/>
				<View
					style={{
						marginTop: 105,
					}}
				>
					{showCart ? (
						<CartList
							itemList={itemList}
							navigation={navigation}
							// rerender={rerender}
						/>
					) : (
						<View style={styles.login}>
							<TouchableOpacity onPress={() => navigation.navigate("Login")}>
								<Text style={styles.loginText}>Login to continue {">>"}</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	overlay: {
		position: "relative",
		height: "100%",
		width: "100%",
		zIndex: 10,
	},
	lottie: {
		position: "absolute",
		backgroundColor: "rgba(255,255,255,0.5)",
		height: "100%",
		width: "100%",
		zIndex: 10,
	},
	login: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: "50%",
	},
	loginText: {
		fontFamily: "zilla-reg",
		fontSize: 20,
		color: "#fc8019",
	},
});
export default Cart;
