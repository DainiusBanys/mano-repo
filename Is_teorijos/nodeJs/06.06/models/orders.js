import mongoose from 'mongoose'

const Schema = mongoose.Schema

const orders = new Schema({
    preke: String,
    vardas: String,
    pavarde: String,
    adresas: String,
    miestas: String,
    telefonas: String,
    pastas: String,
})

export default mongoose.model('orders', orders)