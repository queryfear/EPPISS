require("dotenv").config();
const express = require("express");
const path = require("path");
const authRouter = require("./routers/authRoute");
const tasksRouter = require("./routers/tasksRoute");
const categoriesRouter = require("./routers/categoriesRoute");
const cors = require("cors");
const PORT = process.env.PORT || 8000;

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/static/images")));
app.use("/static", express.static(path.join(__dirname, "/static/style")));
app.use("/pages", express.static(path.join(__dirname, "/static/pages")));
app.use("/script", express.static(path.join(__dirname, "/static/script")));
app.use("/files", express.static(path.join(__dirname, "/static/files")));
app.use("/auth", authRouter);
app.use("/index", express.static(path.join(__dirname, "/static/index.html")))
app.use("/tasks", tasksRouter);
app.use("/categories", categoriesRouter);

const start = async () => {
    try {
        app.listen(PORT, () => console.log("Server is working on port: " + PORT));
    }
    catch(e) {
        console.log(e);
    }
}

start();