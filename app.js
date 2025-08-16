const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors");
const authRoutes = require("./routes/auth.routes")
const subjectRoutes = require("./routes/subject.routes")
const topicRoutes = require("./routes/topic.routes")
const questionRoutes = require("./routes/question.routes")
const examRoutes = require("./routes/exam.routes")
const adminRoutes = require("./routes/admin.routes")
dotenv.config({path:"./config/.env"})
const app = express()

app.use(express.json())
app.use(cors());
app.use('/api',authRoutes)
app.use('/api/subjects',subjectRoutes)
app.use('/api/topics',topicRoutes)
app.use("/api/questions",questionRoutes)
app.use("/api/exams",examRoutes)
app.use("/api/admin",adminRoutes)
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('MonogoDB Connected');
        app.listen(process.env.PORT,()=>{
            console.log(`Server Started ${process.env.PORT}`);
        })
    }).catch(err=>{
        console.error('Databases Connection Error:',err);
    });