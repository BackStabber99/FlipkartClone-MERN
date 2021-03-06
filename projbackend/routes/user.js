const express = require("express");
const router = express.Router();

const {
	getUserById,
	isAuthorized,
	getUserDetails,
	editUserDetails,
	becomeASeller,
} = require("../controllers/user");

const { isSignedIn, isAuthenticated } = require("../controllers/auth");

//parameter extractor
router.param("userId", getUserById);

//getUserDetails
router.get(
	"/getUserDetails/:userId",
	isSignedIn,
	isAuthenticated,
	getUserDetails
);

//editUserDetails
//req.body to contain name and email
router.put(
	"/editUserDetails/:userId",
	isSignedIn,
	isAuthenticated,
	editUserDetails
);

//become a seller
//req.body to contain role:1 and AddharNo
router.put(
	"/becomeASeller/:userId",
	isSignedIn,
	isAuthenticated,
	becomeASeller
);

module.exports = router;
