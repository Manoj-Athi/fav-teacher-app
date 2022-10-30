import mongoose from 'mongoose'

const favSchema = new mongoose.Schema({
    teacherList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
})

export default mongoose.model("favourites", favSchema)