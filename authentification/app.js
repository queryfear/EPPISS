const express = require("express");
const authRouter = require("./authRoute");
const {setUser} = require("./database/userRegistration")
const PORT = process.env.PORT || 8000;


const app = express();


app.use(express.json());
app.use("/auth", authRouter);

const start = () => {
    try {
        app.listen(PORT, () => console.log("Server is working on port: " + PORT));
    }
    catch(e) {
        console.log(e);
    }
}

start();