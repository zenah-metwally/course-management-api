require('node:dns/promises').setServers(['8.8.8.8', '1.1.1.1']);
require("dotenv").config();
const httpStatusText = require("./utils/httpStatusText");
const coursesRouter = require("./routes/courses.routes");
const usersRouter = require("./routes/users.routes");
const express = require("express");
const path = require('path');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const url = process.env.MONGO_URL ;

mongoose.connect(url).then(() => {
  console.log('mongoDB server started');
});

app.use(cors())
app.use(express.json());
app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);
app.use('/uploads' , express.static(path.join(__dirname , 'uploads')))

app.all('/' , (req,res) => {
  return res.status(404).json({ status: httpStatusText.ERROR, message: "resouce is not available" });
})

app.use((error,req,res,next) => {
  res.status(error.statusCode || 500).json({ status: error.statusText || httpStatusText.ERROR, message: error.message })
})

app.listen(process.env.PORT, () => {
  console.log("listening on port: 5000");
});
