const axios = require("axios");
import { BACKEND_URL } from "@env";

export const getAllCartItemsByUserId = (userId, token) => {
	console.log(BACKEND_URL,"Cart2")
	return axios({
		method: "get",
		url: `${BACKEND_URL}/getAllCartItemsByUserId/${userId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
};

export const addProductToCart = (userId, productId, token) => {
	console.log(BACKEND_URL)
	return axios({
		method: "post",
		url: `${BACKEND_URL}/addProductToCart/${userId}/${productId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
};

let cancelToken;
export const updateQuantityInCart = (userId, productId, token, quantity) => {
	console.log(BACKEND_URL)
	if (typeof cancelToken != typeof undefined) {
		cancelToken.cancel("Cancelling previous req");
	}

	cancelToken = axios.CancelToken.source();

	return axios({
		method: "put",
		url: `${BACKEND_URL}/updateQuantityInCart/${userId}/${productId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		data: {
			quantity: quantity,
		},
		cancelToken: cancelToken.token,
	});
};

export const removeProductFromCart = (userId, productId, token) => {

	return axios({
		method: "delete",
		url: `${BACKEND_URL}/removeProductFromCart/${userId}/${productId}`,
		headers: {
			// Accept: "application/json",
			// "Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
};

export const toggleIsSavedForLater = (userId, productId, token) => {
	
	return axios({
		method: "put",
		url: `${BACKEND_URL}/toggleIsSavedForLater/${userId}/${productId}`,
		headers: {
			// Accept: "application/json",
			// "Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
};
