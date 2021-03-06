import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";

const Search = ({ query, handleSearch }) => {
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.formField}
				underlineColorAndroid="transparent"
				placeholder="Enter the item you are looking for..."
				placeholderTextColor="#7e85a1"
				placeholderTextWeight="bold"
				autoCorrect={false}
				value={query}
				onChangeText={(queryText) => handleSearch(queryText)}
			></TextInput>
			<Feather
				name="search"
				size={22}
				color="#FF6B3C"
				style={{
					position: "absolute",
					right: 10,
					top: 12.5,
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: Dimensions.get("screen").width - 28,
		left: 16,
		marginVertical: 10,
	},
	formField: {
		borderWidth: 1,
		paddingHorizontal: 12,
		borderRadius: 5,
		borderColor: "#f7f7f7",
		backgroundColor: "#f7f7f7",
		fontSize: 18,
		fontFamily: "popins-med",
		height: 50,
	},
});
export default Search;
