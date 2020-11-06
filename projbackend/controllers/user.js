const UserSchema = require('../models/user')


exports.getUserById = (req, res, next, id) => {
    UserSchema.findById(id, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found in DB"
            })
        }
        req.profile = user;
        next();
    })
}



exports.isAuthorized = (req, res, next) => {
    // console.log(req.profile);
    if (req.profile.role == 1 || req.profile.role == 2) {
        next();
    }
    else {
        return res.status(400).json({
            error: "User not a seller"
        })
    }
}

exports.getUserDetails = (req, res) => {
    const id = req.profile._id;
    UserSchema.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                msg: "DB Error || User Not Found"
            })
        }
        let { name, email, phone } = user;
        let address = user.address.defaultAddress;

        return res.status(200).json({
            name,
            email,
            phone,
            address
        })
    })
}

exports.editUserDetails = (req, res) => {
    const id = req.profile._id;
    UserSchema.findByIdAndUpdate(
        { _id: id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    msg: "DB Error || User Not Found"
                })
            }
            const { name, email } = user
            return res.status(200).json({
                name,
                email,
                msg: "Updated successfully"
            })
        }
    )
}
