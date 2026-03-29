// Entry file
const express=require('express')
const mongoose=require('mongoose')
const cors =require("cors")
require("dotenv").config()

const app=express()
app.use(express.json())
app.use(cors())

const userRoutes = require("./route/userRoutes");

app.use("/api/users", userRoutes);

const serviceRoutes = require("./route/serviceRoutes");

app.use("/api/services", serviceRoutes);

const projectRoutes = require("./route/projectRoutes");

app.use("/api/projects", projectRoutes);

const jobRoutes = require("./route/jobRoutes");

app.use("/api/jobs", jobRoutes);

const contactRoutes = require("./route/contactRoutes");

app.use("/api/contacts", contactRoutes);






// connection to the database
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongodb connected"))
.catch(err=>console.log("mongodb connected error",err))



const PORT=3004
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})



































































































































































































