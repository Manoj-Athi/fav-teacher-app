import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dept: {
        type: String,
    },
    role:{
        type: String,
        required: true
    },
    favourites:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'favourites'
    },
})

export default mongoose.model("user", userSchema)