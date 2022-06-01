import mongoose from "mongoose";

export default new mongoose.Schema({

    taskName: String,
    done: Boolean

})