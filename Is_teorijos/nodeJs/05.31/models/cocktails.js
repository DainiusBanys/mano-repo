import mongoose from 'mongoose'

const Schema = mongoose.Schema

const cocktails = new Schema({
    title: String,
    instructions: String,
    thumbnail: String,
})

export default mongoose.model('cocktails', cocktails)