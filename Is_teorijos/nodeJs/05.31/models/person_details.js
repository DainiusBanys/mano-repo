import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PersonDetails = new Schema({
    name: String,
    address: String,
    company: String,
    image: String,
    phone: String,
    website: String
})

export default mongoose.model('PersonDetails', PersonDetails)