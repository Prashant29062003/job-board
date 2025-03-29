import userModel from "../models/userModel.js"

export const registerController = async (req, res, next) => {

    const { name, email, password } = req.body
    // validate
    if (!name) {
        return next("Name is required.");
    }
    if (!email) {
        return next("Email is required.")
    }
    if (!password) {
        return next("Password is required and should be greater than 6 character.")
    }
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
        return next("Email already registered, Please Login!")
    }
    
    const user = await userModel.create({
        name,
        email,
        password
    })
    return res.status(201).send({
        success: true,
        message: "user created",
        user: {
            name: user.name,
            email: user.email,
            _id: user._id
        },

    })

};