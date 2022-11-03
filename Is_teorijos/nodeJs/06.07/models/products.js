import mongoose from 'mongoose'

const Schema = mongoose.Schema

const products = new Schema({
    preke: String,
    paveiksliukas: String,
    aprasymas: String
})

export default mongoose.model('products', products)