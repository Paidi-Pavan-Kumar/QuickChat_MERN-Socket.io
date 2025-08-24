import { generateToken } from "../lib/utils.js"
import User from "../models/User.js"

export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body
    try {
        if (!fullName || !email || !password || !bio) {
            return res.json(
                {
                    success: false,
                    message: "Missing Details"
                }
            )
        }

        const user = await User.findOne({email})
        if(user) {
            return res.json({
                success : false,
                message : "Account Already Exists"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({
            fullName, email, password : hashedPassword, bio
        })

        const token = generateToken(newUser._id)
        return res.json({
            success : true,
            userData : newUser,
            token,
            message : 'Account Created Successfully'
        })
    } catch (error) {
        console.log(error.message)
        return res.json({
            success : false,
            message : error.message
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if ( !email || !password ) {
            return res.json(
                {
                    success: false,
                    message: "Missing Details"
                }
            )
        }

        const user = await User.findOne({email})
        if(!user) {
            return res.json({
                success : false,
                message : "User Not Found"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect) {
            return res.json({
                success : false,
                message : "Invalid Credentials"
            })
        }
        const token = generateToken(user._id)
        return res.json({
            success : true,
            userData : user,
            token,
            message : 'Login Successful'
        })
    } catch (error) {
        console.log(error.message)
        return res.json({
            success : false,
            message : error.message
        })
    }
}

export const CheckAuth = (req, res) => {
    res.json({
        success : true,
        user : req.user
    })
}