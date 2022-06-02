import mongoose from "mongoose";
import tasks from '../models/tasks.js'

mongoose.connect('mongodb://localhost:27017/ToDoList', (error) => {
    if (error) {
        console.log('Nepavyko prisijungti prie duomenu bazes ' + error)
        return
    }
})
export const Tasks = mongoose.model('Tasks', tasks)