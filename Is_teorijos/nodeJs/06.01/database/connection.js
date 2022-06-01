import mongoose from "mongoose";
import tasks from '../models/tasks.js'

export default mongoose.connect('mongodb://localhost:27017/ToDoList', (error) => {
    if (error) {
        console.log('Nepavyko prisijungti prie duomenu bazes ' + error)
        return
    }
    mongoose.model('Tasks', tasks)
})