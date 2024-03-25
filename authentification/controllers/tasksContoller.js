const taskModel = require("../models/tasks-model")

class TasksController {
    async addTask(req, res) {
        try {
            const { taskName, taskDescription, categId } = req.body;
            await taskModel.addTask(taskName, taskDescription, categId);
            return res.status(200).json({message: "Все ок"});
        } catch(e) {
            res.status(400).json({message: "Что-то пошло не так"});
        }   
    }
    async getTasks(req, res) {
        try {
            const { id } = req.params;
            const tasks = await taskModel.getAllTasks(id);
            return res.render("tasks", {tasks: tasks});
        } catch(e) {
            res.status(400).json({message: "Что-то пошло не так"});
        }    
    }

    async getTask(req, res) {
        try {
            const { id } = req.params;
            const task = await taskModel.getTask(id);
            return res.render("task", {task: task});
        } catch(e) {
            const { id } = req.params;
            const tasks = await taskModel.getTask(id);
            return res.render("task", {task: task});
            res.status(400).json({message: "Что-то пошло не так"});
        }    
    }
}

module.exports = new TasksController();