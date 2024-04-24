import express from "express"; 
import path from "path"
import { connectDB } from "./database/connect.js";
import { User } from "./database/models/userSchema.js";

const app = express()
connectDB()

// Middleware
app.use(express.static(path.join(path.resolve(), "/public")))
app.use(express.urlencoded({extended: true}))

// --------------------------------------------------------------------------------

app.get("/", (req, res) => {
    res.sendFile(path.join(path.resolve(), "index.html"))
})

// --------------------------------------------------------------------------------


app.get("/success", (req, res) => {
    res.render("success.ejs")
})


// --------------------------------------------------------------------------------


app.get("/successlog", (req, res) => {
    res.render("successLog.ejs")
})


// --------------------------------------------------------------------------------


app.get("/login", (req, res) => {
    res.render("login.ejs")
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body;

    const userExist = await User.findOne({email})

    if (!userExist) {
        res.render("login.ejs", {errorMessage: "Register Yourself"})
    }
    else if (password == userExist.password) {
        res.redirect("/successlog")
    }
    else {
        res.render("login.ejs", {errorMessage: "Incorrect Password"})
    }
})


// --------------------------------------------------------------------------------



app.get("/signup", (req, res) => {
    res.render("signup.ejs")
})

app.post("/signup", async (req, res) => {
    const {user_name, phone, email, password} = req.body

    const userExist = await User.findOne({email})
    if (userExist) {
        res.render("signup.ejs", {errorMessage: "User Already Exists"})
    }
    else {
        await User.create(
            {
                user_name: user_name,
                phone: phone,
                email: email,
                password: password
            }
        )
        
        res.redirect("/success")
    }
})


// --------------------------------------------------------------------------------


app.listen(4000, () => {
    console.log("Server is Running")
})